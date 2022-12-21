class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._initialArray = items;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      const element = this._renderer(item);
    });
  }

  addItem(element) {
    this._containerSelector.append(element);
  }

  prependItem(element) {
    this._containerSelector.prepend(element);
  }
}

export { Section };
