import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

// Test the Apps Script handler against in-memory Sheets/Mail substitutes.
// No network requests, customer records or real notification emails are created.
const rows = [Array(11).fill('header')], cache = new Map(), notifications = [];
let mailFails = false, locked = false;
const sheet = {
  getLastRow: () => rows.length,
  appendRow: row => rows.push(row),
  getRange: (row, column) => ({
    getValue: () => rows[row - 1][column - 1],
    setValue: value => { rows[row - 1][column - 1] = value; },
    createTextFinder: value => ({ matchEntireCell: () => ({ findNext: () => {
      const index = rows.findIndex((r, i) => i > 0 && r[1] === value);
      return index < 0 ? null : { getRow: () => index + 1 };
    } }) })
  })
};
const context = {
  console: { error() {} }, Date,
  PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'test-sheet' }) },
  SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush() {} },
  LockService: { getScriptLock: () => ({ tryLock: () => (locked = true), hasLock: () => locked, releaseLock: () => { locked = false; } }) },
  CacheService: { getScriptCache: () => ({ get: key => cache.get(key), put: (key, value) => cache.set(key, value) }) },
  MailApp: { getRemainingDailyQuota: () => 100, sendEmail: message => { if (mailFails) throw Error('quota'); notifications.push(message); } },
  Utilities: { DigestAlgorithm: { SHA_256: 'sha256' }, computeDigest: (_, value) => [...createHash('sha256').update(value).digest()] },
  ContentService: { MimeType: { JSON: 'json' }, createTextOutput: text => ({ text, setMimeType() { return this; } }) }
};
vm.createContext(context);
vm.runInContext(readFileSync('integrations/google-sheets/Code.gs', 'utf8'), context);
const base = { requestId: '17d7e191-5f72-4ea5-8f6f-a740fd6e3411', startedAt: String(Date.now() - 6000), name: '=FORMULA()', email: 'test@example.com', enquiry: 'Custom API integration', message: 'Test message', phone: '412 345 678', dialCode: '+61', country: 'AU', companyWebsite: '' };
const send = fields => JSON.parse(context.doPost({ parameter: fields }).text);
assert.equal(send(base).ok, true);
assert.equal(rows.length, 2); assert.equal(notifications.length, 1);
assert.equal(rows[1][2], "'=FORMULA()"); assert.equal(rows[1][5], "'+61");
assert.equal(notifications[0].to, 'works.yashjain@gmail.com');
assert.equal(notifications[0].replyTo, 'test@example.com');
assert.equal(send(base).ok, true); assert.equal(rows.length, 2); assert.equal(notifications.length, 1);
assert.equal(send({ ...base, enquiry: 'changed payload' }).ok, false);
assert.equal(send({ ...base, requestId: '27d7e191-5f72-4ea5-8f6f-a740fd6e3411', phone: 'invalid' }).ok, false);
assert.equal(send({ ...base, companyWebsite: 'spam' }).ok, false);
assert.equal(send({ ...base, email: 'invalid' }).ok, false);
assert.equal(send({ ...base, enquiry: ' ' }).ok, false);
mailFails = true;
assert.equal(send({ ...base, requestId: '37d7e191-5f72-4ea5-8f6f-a740fd6e3411', phone: '', dialCode: '', country: '' }).ok, true);
assert.equal(rows.length, 3); assert.match(rows[2][9], /Not sent/);
assert.equal(locked, false);
console.log('PASS server validation, formula escaping, fixed notification recipient, deduplication, conflict rejection and saved leads on mail failure');
