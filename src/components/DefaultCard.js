import Card from "./Card";

export default class DefaultCard extends Card {
  constructor(selector, methods, cardObject, userId) {
    super(selector, methods, cardObject, userId);
  }

  generate() {
    super.generate();
    this._trashCan.remove();

    return this._element;
  }
}
