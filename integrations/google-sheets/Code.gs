/** Portfolio enquiries. Deploy as a public web app executing as the owner.
 * Run setup() once before deploying. Never put credentials in contact-config.js.
 */
const TARGET_SPREADSHEET_ID = '1YR3krXB9KNwZRF4OlybF-fe64hWRdgMG3CwyrsEv39M';
const NOTIFICATION_EMAIL = 'works.yashjain@gmail.com';
const SHEET_NAME = 'Enquiries';
const HEADERS = ['Received at', 'Request ID', 'Name', 'Email', 'Country', 'Calling code', 'Phone number', 'What can I help with?', 'Project details', 'Notification status', 'Payload fingerprint'];

function setup() {
  const properties = PropertiesService.getScriptProperties();
  const spreadsheet = SpreadsheetApp.openById(TARGET_SPREADSHEET_ID);
  properties.setProperty('SPREADSHEET_ID', spreadsheet.getId());
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.getRange('E:I').setNumberFormat('@');
  } else if (JSON.stringify(sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0]) !== JSON.stringify(HEADERS)) {
    throw new Error('The existing Enquiries tab has different columns. Rename it before running setup; its contents have not been changed.');
  }
  // Request the email permission during owner setup, not during a visitor request.
  MailApp.getRemainingDailyQuota();
  console.log('Enquiry spreadsheet: ' + spreadsheet.getUrl());
}

function doGet() { return jsonResponse_({ service: 'Portfolio enquiries', ready: Boolean(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')) }); }

function doPost(event) {
  const fields = event && event.parameter || {};
  const requestId = String(fields.requestId || '');
  let lock;
  try {
    const enquiry = validateEnquiry_(fields);
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) throw new Error('NOT_CONFIGURED');
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) throw new Error('BUSY');
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(SHEET_NAME);
    if (!sheet || sheet.getLastRow() === 0) throw new Error('NOT_CONFIGURED');
    const fingerprint = digest_(JSON.stringify(enquiry));
    const rows = sheet.getLastRow();
    const existing = rows > 1 ? sheet.getRange(2, 2, rows - 1, 1).createTextFinder(requestId).matchEntireCell(true).findNext() : null;
    if (existing) {
      if (sheet.getRange(existing.getRow(), 11).getValue() !== fingerprint) throw new Error('REQUEST_CONFLICT');
      return jsonResponse_({ ok: true, requestId: requestId });
    }
    // Basic spam protection. Cache limits are best effort, not a CAPTCHA.
    const cache = CacheService.getScriptCache();
    const bucket = Math.floor(Date.now() / 3600000);
    const key = 'sender:' + digest_(enquiry.email.toLowerCase()) + ':' + bucket;
    const attempts = Number(cache.get(key) || 0);
    if (attempts >= 5) throw new Error('RATE_LIMITED');
    cache.put(key, String(attempts + 1), 3600);
    sheet.appendRow([new Date(), requestId, cellText_(enquiry.name), cellText_(enquiry.email), enquiry.country, cellText_(enquiry.dialCode), cellText_(enquiry.phone), cellText_(enquiry.enquiry), cellText_(enquiry.message), 'Pending', fingerprint]);
    const row = sheet.getLastRow();
    SpreadsheetApp.flush();
    try {
      if (MailApp.getRemainingDailyQuota() < 1) throw new Error('EMAIL_QUOTA');
      const phone = enquiry.phone ? enquiry.dialCode + ' ' + enquiry.phone : 'Not provided';
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        replyTo: enquiry.email,
        subject: 'New portfolio enquiry: ' + enquiry.enquiry.replace(/[\r\n]/g, ' ').slice(0, 100),
        body: 'A new enquiry has been saved.\n\nName: ' + enquiry.name + '\nEmail: ' + enquiry.email + '\nPhone: ' + phone + '\nCountry: ' + (enquiry.country || 'Not provided') + '\n\nWhat can I help with?\n' + enquiry.enquiry + '\n\nProject details:\n' + enquiry.message + '\n\nOpen enquiries: https://docs.google.com/spreadsheets/d/' + spreadsheetId
      });
      sheet.getRange(row, 10).setValue('Sent');
    } catch (notificationError) {
      // The lead is safely stored even if email delivery/quota fails.
      sheet.getRange(row, 10).setValue('Not sent — check mail quota/permissions');
      console.error('Notification failed for request ' + requestId);
    }
    return jsonResponse_({ ok: true, requestId: requestId });
  } catch (error) {
    // Never return a spreadsheet URL, customer record or internal exception.
    return jsonResponse_({ ok: false, requestId: requestId, error: 'Unable to save this enquiry. Please retry or email directly.' });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function validateEnquiry_(fields) {
  const clean = (key, maximum, required) => {
    const value = String(fields[key] || '').trim();
    if ((required && !value) || value.length > maximum) throw new Error('INVALID_' + key);
    return value;
  };
  if (String(fields.companyWebsite || '') !== '') throw new Error('SPAM');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(fields.requestId || ''))) throw new Error('INVALID_ID');
  const startedAt = Number(fields.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2000) throw new Error('TOO_FAST');
  const result = { name: clean('name', 100, true), email: clean('email', 254, true), enquiry: clean('enquiry', 200, true), message: clean('message', 3000, true), phone: clean('phone', 25, false), dialCode: clean('dialCode', 5, false), country: clean('country', 5, false) };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) throw new Error('INVALID_EMAIL');
  if (result.phone) {
    const digits = result.phone.replace(/[^0-9]/g, '');
    if (!/^[0-9 ()-]+$/.test(result.phone) || digits.length < 6 || !/^\+[1-9][0-9]{0,3}$/.test(result.dialCode) || (result.dialCode.slice(1) + digits).length > 15 || !/^(?:[A-Z]{2}|OTHER)$/.test(result.country)) throw new Error('INVALID_PHONE');
  } else {
    result.dialCode = ''; result.country = '';
  }
  return result;
}
function cellText_(value) { return /^[\s]*[=+@-]/.test(value) ? "'" + value : value; }
function digest_(value) { return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value).map(byte => ('0' + (byte & 255).toString(16)).slice(-2)).join(''); }
function jsonResponse_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
