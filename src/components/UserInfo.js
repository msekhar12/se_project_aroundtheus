class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector, userId }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
    this._userId = document.querySelector(userId);
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent,
    };
  }

  setUserInfo(profileName, profileJob) {
    this._profileName.textContent = profileName;
    this._profileJob.textContent = profileJob;
    this._avatarSelector.alt = `Profile image of ${profileName}`;
  }

  setAvatar(avatarUrl, avatarAlt) {
    this._avatarSelector.src = avatarUrl;
    this._avatarSelector.alt = avatarAlt;
  }
}

export { UserInfo };
