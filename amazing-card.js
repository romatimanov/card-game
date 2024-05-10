import { Card } from "./card.js";

export class AmazingCard extends Card {
    constructor(container, cardNumber, flip) {
        super(container, cardNumber, flip);
    }

    createElement() {
        const card = super.createElement();
        const img = document.createElement('img');
        img.classList.add('image')
        card.textContent = '';
        img.src = this.cardNumber;
        img.onerror = () => {
            img.src = './img/defolt.png';
            throw new Error('Ошибка загрузки изображения');
        };
        card.appendChild(img);
        return card
    }

}