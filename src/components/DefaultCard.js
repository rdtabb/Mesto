import Card from "./ParentCard";

export class DefaultCard extends Card {
  constructor(selector, id, methods, cardObject) {
    super(selector, id, methods, cardObject);
  }

  generate() {
    this._element = super.generate();
    this._element.querySelector(".card__delete").remove();

    return this._element;
  }
}
