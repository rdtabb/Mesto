import { cardsSection } from "../pages";

// export default function clearCardsSection() {
//     const childrenElements = Array.from(cardsSection.children);
//     childrenElements.forEach((el) => {
//         cardsSection.removeChild(el);
//     });
// }

export function showLoadingText(element) {
    element.textContent = 'Сохраняется...'
}

export function hideLoadingText(element) {
    element.textContent = 'Cохранить'
}