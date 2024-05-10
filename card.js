export class Card {
    constructor(container, cardNumber, flip) {
        this.container = container;
        this.cardNumber = cardNumber;
        this.open = false;
        this.success = false;
        this.flip = flip;
        this.element = this.createElement();
    }

    createElement() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = this.cardNumber;
        card.addEventListener('click', () => {
            this.flip(this);
        });
        this.container.append(card);
        return card
    }

    set cardNumber(value) {
        this._cardNumber = value
        if (this.element) this.element.textContent = value;
    }

    get cardNumber() {
        return this._cardNumber
    }

    set open(value) {
        this._open = value;
        if (this.element) this.element.classList.toggle('card__back', value);
    }

    get open() {
        return this._open
    }

    set success(value) {
        this._success = value;
        if (this.element) this.element.classList.toggle('card__success', value);
    }

    get success() {
        return this._success;
    }
}