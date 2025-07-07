const baseUrl = "http://localhost:3001";

const checkResponse = (res, customErrorMessage) => {
  if (res.ok) {
    return res.json();
  }

  const baseMessage = `Error: ${res.status}`;
  const fullMessage = customErrorMessage
    ? `${customErrorMessage} (${baseMessage})`
    : baseMessage;

  return Promise.reject(fullMessage);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => checkResponse(res, "Failed to delete item"));
}

export { getItems, addItem, deleteItem, checkResponse };
