export function Card(container, cardNumber, flip) {
    this.container = container;
    this.cardNumber = cardNumber;
    this.open = false;
    this.success = false;
    this.flip = flip;
    this.element = this.createElement();
}

const method = {
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
}

Object.assign(Card.prototype, method)

Object.defineProperty(Card.prototype, 'cardNumber', {
    set(value) {
        this._cardNumber = value
        if (this.element) this.element.textContent = value;
    },
    get() {
        return this._cardNumber
    }
})
Object.defineProperty(Card.prototype, 'success', {
    set(value) {
        this._success = value;
        if (this.element) this.element.classList.toggle('card__success', value);
    },

    get() {
        return this._success;
    }
})
Object.defineProperty(Card.prototype, 'open', {
    set(value) {
        this._open = value;
        if (this.element) this.element.classList.toggle('card__back', value);
    },

    get() {
        return this._open
    }
})