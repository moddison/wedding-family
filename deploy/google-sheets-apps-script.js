const SHEET_NAME = 'RSVP';

function doPost(event) {
  const sheet = getSheet();
  const payload = JSON.parse(event.postData.contents || '{}');
  const answers = payload.answers || {};
  const guest = payload.guest || {};

  sheet.appendRow([
    new Date(),
    guest.firstName || '',
    guest.lastName || '',
    JSON.stringify(answers),
    payload.id || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['Дата', 'Имя', 'Фамилия', 'Ответы JSON', 'ID']);
  }

  return sheet;
}
