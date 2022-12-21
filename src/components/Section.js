class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._initialArray = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach(this._renderer);
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
