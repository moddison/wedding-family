export async function sendResponseToGoogleSheets(scriptUrl, response) {
  const payload = JSON.stringify(response);

  await fetch(scriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: payload,
  });
}
