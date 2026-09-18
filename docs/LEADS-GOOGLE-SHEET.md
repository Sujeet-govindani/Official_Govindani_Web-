# Leads into a Google Sheet

Five minutes, once. No Google Cloud project, no OAuth, no API key.

The chat posts each captured lead to an Apps Script attached to your sheet.
The script URL is the only secret, and it lives in `config.php` on the server —
never in the website code.

---

## 1. Make the sheet

New Google Sheet, name it something like **Website leads**.

Put these headers in row 1, in this order — the script writes to them by
position, so the order matters:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Received | Name | Organisation | Mobile | What they need | Leaning towards | What they asked |

## 2. Add the script

In the sheet: **Extensions → Apps Script**. Delete whatever is there and paste
this in full:

```javascript
// Receives leads from the govindaniit.com chat assistant.
// Deploy as: Execute as = Me, Who has access = Anyone.
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);                      // two leads at once must not collide
  try {
    var d = JSON.parse(e.postData.contents);

    // Only accept posts carrying the shared secret.
    if (d.token !== SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'bad token' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      new Date(),
      d.name  || '',
      d.org   || '',
      "'" + (d.phone || ''),                 // leading quote keeps +91 intact
      d.need  || '',
      d.plan  || '',
      d.asked || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Change this to any long random string, then put the SAME string in
// config.php as 'sheet_token'. It stops anyone who finds the URL from
// writing junk rows into your sheet.
var SECRET = 'CHANGE-ME-TO-A-LONG-RANDOM-STRING';
```

Change `SECRET` to something long and random, and remember it for step 4.

## 3. Deploy it

**Deploy → New deployment → ⚙ → Web app**

- Description: `leads`
- **Execute as: Me**
- **Who has access: Anyone**

Click **Deploy**, approve the permission prompt (it is your own script writing
to your own sheet), and copy the **Web app URL**. It looks like:

```
https://script.google.com/macros/s/AKfycb.../exec
```

> "Who has access: Anyone" is required — our server calls it without a Google
> login. The `SECRET` is what actually protects it, which is why it must not be
> left as the default.

## 4. Give it to the server

SSH in and run:

```bash
bash ~/set-sheet.sh
```

It asks for the URL, then the secret, and writes both into `config.php`.
Neither is echoed and neither goes into shell history.

## 5. Test

Ask me to send a test lead and I will, then check row 2 appears.

---

## What gets written

One row per captured lead: when, name, organisation, mobile, what they need,
which plan they were leaning towards, and every question they asked in that
conversation. The last column is what tells your salesperson how to open the
call.

A lead is only written when the assistant has both a **name and a mobile
number**. It does not write speculative rows.
