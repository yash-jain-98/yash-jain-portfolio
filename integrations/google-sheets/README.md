# Google Sheets contact form

The website works on GitHub Pages and Sites. A Google Apps Script web app handles
storage and email; no Google credentials are shipped to the browser.

## Activate in the owner's Google account

1. Open [the supplied enquiry spreadsheet](https://docs.google.com/spreadsheets/d/1YR3krXB9KNwZRF4OlybF-fe64hWRdgMG3CwyrsEv39M/edit), then choose **Extensions → Apps Script**. Name the script project **Portfolio enquiries**.
2. Replace its `Code.gs` with this folder's `Code.gs`. Under Project Settings,
   enable the manifest editor and replace `appsscript.json` with the supplied file.
3. Run **setup** once and approve access to Sheets and email. It creates an
   **Enquiries** tab in your supplied spreadsheet. Running setup again reuses it.
   Existing tabs are preserved. Keep the spreadsheet private.
4. Choose **Deploy → New deployment → Web app**. Execute as **Me**, with access
   **Anyone** so visitors do not need to sign into Google. If your organisation
   disallows anonymous web apps, this route needs a different form backend.
5. Copy the deployed URL ending in `/exec`. Paste it as `endpoint` in the root
   `contact-config.js` file, or send it to the website maintainer. Do not use `/dev`.
6. Build, check and publish the site. The button changes to **Send enquiry** only
   when a valid Apps Script endpoint is configured.
7. Submit one clearly labelled test enquiry from `https://jainyash.in/` and the
   Sites mirror. Confirm the browser success message, exactly one new sheet row,
   and an email to `works.yashjain@gmail.com`. Check spam if necessary.

The Google connection is NOT active until steps 1–7 have been completed. A local
mock test does not prove Google permissions, cross-origin responses or email delivery.
The script has not been deployed by placing these files in GitHub.

## Behaviour

Columns: received time, request ID, name, email, country, calling code, phone,
custom enquiry, project details, notification status and an internal fingerprint.
Phone is optional; country code plus the number as entered are preserved. The
form validates basic length/characters, not phone ownership or regional numbering.

The backend validates fields, rejects a honeypot and very fast requests, limits
repeated submissions from the same email, and escapes spreadsheet formula prefixes.
A script lock and request ID prevent a normal retry from creating duplicate rows
or duplicate notifications. Browser failures retain the form and retry ID.
Spam controls are basic: monitor the sheet and consider CAPTCHA if abuse appears.

Email is plain text with the visitor's email as Reply-To. Recipients are fixed in
`Code.gs`; visitors cannot supply them. Failed notifications are marked in the
sheet; they do not discard the lead. Check **Notification status** and Apps Script
Executions if notifications stop. Apps Script/MailApp quotas depend on the account.
There is no automatic resend of failed notification emails.

The browser uses an ordinary URL-encoded POST and requires readable JSON with
`ok: true` and the matching request ID. It never treats an opaque `no-cors`
response as success. If a real deployed endpoint fails CORS or access checks,
verify deployment/access and test a new deployment; do not silence the error.
Keep the email fallback until live end-to-end checks pass.

The contact form is masked for Clarity, and no submitted content is sent to GA4.
While `endpoint` is empty, submission opens an email draft containing all fields;
it does not store a row or trigger a server notification.


## Endpoint configured — 29 October 2026

The owner supplied the deployed `/exec` URL, which is now configured in
`contact-config.js`. On a matching confirmed success response, the form displays
confirmation and redirects to `https://wa.me/919510542689`. A visible continuation
link is also supplied. Failed/unconfirmed submissions retain the enquiry and do
not redirect. Customer fields are not appended to the WhatsApp URL and the site
does not send a WhatsApp message automatically.

The local browser tests mock the Apps Script response. This execution environment
cannot access script.google.com (network policy denies it), so actual sheet writes,
notification delivery and Google's cross-origin response still need a live test.
The endpoint being configured does not establish that end-to-end verification passed.
