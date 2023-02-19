class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error updating user information: ${res.status}`);
  }

  setOptions(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  updateUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: this._options.body,
    }).then(this._checkResponse);
  }

  addNewPicture() {
    return fetch(`${this._options.baseUrl}/cards `, {
      method: "POST",
      headers: this._options.headers,
      body: this._options.body,
    }).then(this._checkResponse);
  }

  deleteCard() {
    return fetch(`${this._options.baseUrl}/cards/${this._options.cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  updateLikeCard() {
    if (this._options.cardLiked) {
      return fetch(
        `${this._options.baseUrl}/cards/likes/${this._options.cardId}`,
        {
          method: "DELETE",
          headers: this._options.headers,
        }
      ).then(this._checkResponse);
    } else {
      return fetch(
        `${this._options.baseUrl}/cards/likes/${this._options.cardId}`,
        {
          method: "PUT",
          headers: this._options.headers,
        }
      ).then(this._checkResponse);
    }
  }

  updateAvatar() {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: this._options.body,
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  performPromiseAll(promiseList) {
    return Promise.all(promiseList);
  }
}

export { Api };
