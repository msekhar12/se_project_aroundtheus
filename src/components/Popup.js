class Popup {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
    this._modalClose = this._modal.querySelector(".modal__close");
    // I have to use this stmt to handle the esc key
    // else the whole window is getting closed.
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    window.addEventListener("keydown", this._handleEscClose);
    this._modal.classList.add("modal_open");
  }

  close() {
    this._modal.classList.remove("modal_open");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._modalClose.addEventListener("click", () => this.close());

    this._modal.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_open")) {
        this.close();
      }
    });
  }
}

export { Popup };
