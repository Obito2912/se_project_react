const baseUrl = "http://localhost:3001";

const checkResponse = (res, customErrorMessage) => {
    if (res.ok) {
        return res.json();
    }

    const baseMessage = `Error: ${res.status}`;
    const fullMessage = customErrorMessage ? `${customErrorMessage} (${baseMessage})` : baseMessage;
    return Promise.reject(fullMessage);
}

export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(res => checkResponse(res, 'Failed to validate token'));
}

export function signUp({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(res => checkResponse(res, 'Failed to Sign Up'));
}

export function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => checkResponse(res, 'Failed to Sign In'));
}
