const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.computersforpeace.net"
    : "http://localhost:3001";

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

function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => checkResponse(res, "Failed to add item"));
}

function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res, "Failed to delete item"));
}

function updateUser({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => checkResponse(res, "Failed to update item"));
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res, "Failed to like item"));
}

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res, "Failed to unlike item"));
}

export {
  getItems,
  addItem,
  deleteItem,
  checkResponse,
  updateUser,
  addCardLike,
  removeCardLike,
};
