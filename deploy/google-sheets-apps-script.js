const SHEET_NAME = 'RSVP';
const BASE_HEADERS = ['Дата', 'Имя', 'Фамилия'];
const TECH_HEADERS = ['ID'];

function doPost(event) {
  const payload = JSON.parse(event.postData.contents || '{}');
  const sheet = getSheet();
  const questions = Array.isArray(payload.questions) ? payload.questions : [];
  const headers = ensureHeaders(sheet, questions);
  const row = buildEmptyRow(headers);
  const guest = payload.guest || {};
  const answers = payload.answers || {};

  row[headers.indexOf('Дата')] = new Date();
  row[headers.indexOf('Имя')] = guest.firstName || '';
  row[headers.indexOf('Фамилия')] = guest.lastName || '';
  row[headers.indexOf('ID')] = payload.id || '';

  questions.forEach((question) => {
    const title = question.title || question.id;
    const columnIndex = headers.indexOf(title);
    if (columnIndex >= 0) {
      row[columnIndex] = formatAnswer(answers[question.id]);
    }
  });

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders(sheet, questions) {
  const questionHeaders = questions.map((question) => question.title || question.id);
  const requiredHeaders = BASE_HEADERS.concat(questionHeaders, TECH_HEADERS);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(requiredHeaders);
    return requiredHeaders;
  }

  const lastColumn = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const nextHeaders = headers.slice();

  requiredHeaders.forEach((header) => {
    if (!nextHeaders.includes(header)) {
      nextHeaders.push(header);
    }
  });

  if (nextHeaders.length !== headers.length) {
    sheet.getRange(1, 1, 1, nextHeaders.length).setValues([nextHeaders]);
  }

  return nextHeaders;
}

function buildEmptyRow(headers) {
  return headers.map(() => '');
}

function formatAnswer(value) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return value || '';
}
