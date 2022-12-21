class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
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
  }
}

export { UserInfo };
