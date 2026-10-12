/** The "website leads" spreadsheet this script writes into. */
var SHEET_ID = 'PUT_THE_SHEET_ID_HERE';  // the leads spreadsheet — kept out of this public repo

/**
 * Google Apps Script for the govindaniit.com lead sheet.
 *
 * The /ngoindia form alternates leads between the two telecallers and sends the
 * owner in the payload. This routes each row into that person's own tab and
 * creates the tab (with headers) the first time it is needed.
 *
 * Paste over the existing doPost, Deploy > Manage deployments > edit > Deploy.
 * The deployment URL must stay the same or the website stops reaching it.
 */
function doPost(e) {
  // `e` is undefined when you press Run in the editor — that is not a failure,
  // it just means nobody posted anything. Real requests always carry it.
  if (!e) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, note: 'No request. Use the website form, not Run.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    data = e.parameter || {};
  }

  // This project is standalone, not bound to the sheet, so getActiveSpreadsheet()
  // returns null here — the sheet has to be opened by id.
  var book = SpreadsheetApp.openById(SHEET_ID);

  // `sheet` comes from the website: "Lucky" or "Sarita". Anything else — the
  // older forms on the site send no agent — keeps going to the original tab.
  var wanted = String(data.sheet || '').trim();
  var name = (wanted === 'Lucky' || wanted === 'Sarita') ? wanted : 'Leads';

  var tab = book.getSheetByName(name);
  if (!tab) {
    tab = book.insertSheet(name);
    tab.appendRow(['Timestamp', 'Name', 'Phone', 'WhatsApp', 'Email', 'City',
                   'Requirement', 'Has website', 'Budget', 'Assigned to', 'Source', 'Message']);
    tab.setFrozenRows(1);
    tab.getRange('A1:L1').setFontWeight('bold');
  }

  tab.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    data.whatsapp || '',
    data.email || '',
    data.city || data.experience || '',
    data.requirement || '',
    data.hasWebsite || '',
    data.budget || '',
    data.agent || '',
    data.source || '',
    data.message || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, sheet: name }))
    .setMimeType(ContentService.MimeType.JSON);
}


/**
 * Press Run on this (not doPost) to prove the wiring end to end: it writes one
 * clearly marked row into each telecaller's tab. Delete the two rows after.
 */
function testBothTabs() {
  ['Lucky', 'Sarita'].forEach(function (who) {
    var res = doPost({ postData: { contents: JSON.stringify({
      name: 'ZZ TEST - delete me', phone: '0000000000', whatsapp: '0000000000',
      email: 'test@example.com', city: 'TEST',
      requirement: 'A new website for my NGO',
      hasWebsite: 'No, this is my first website',
      budget: 'Yes, ready to proceed',
      agent: who, sheet: who, source: 'self test', message: 'TEST row - safe to delete',
    }) } });
    Logger.log(who + ' -> ' + res.getContent());
  });
}
