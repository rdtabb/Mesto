import { cardsSection } from "../pages";

export default function clearCardsSection() {
    const childrenElements = Array.from(cardsSection.children);
    childrenElements.forEach((el) => {
        cardsSection.removeChild(el);
    });
}