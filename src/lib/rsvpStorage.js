export function readStoredResponses(storageKey) {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredResponse(storageKey, response) {
  const responses = readStoredResponses(storageKey);
  const nextResponses = [response, ...responses];
  window.localStorage.setItem(storageKey, JSON.stringify(nextResponses));
  return nextResponses;
}

export function clearStoredResponses(storageKey) {
  window.localStorage.removeItem(storageKey);
}

export async function sendResponseToGoogleSheets(scriptUrl, response) {
  if (!scriptUrl) {
    return { skipped: true };
  }

  const payload = JSON.stringify(response);

  await fetch(scriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: payload,
  });

  return { skipped: false };
}

export function downloadResponses(filename, responses) {
  const blob = new Blob([JSON.stringify(responses, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
