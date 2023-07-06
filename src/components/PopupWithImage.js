import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popup, {name , link , alt}) {
        super(popup);
        const image = this._element.querySelector('.popup__cover');
        const caption = this._element.querySelector('.popup__caption');

        image.src = link;
        image.alt = alt;
        caption.textContent = name;
    }
}