import { AmazingCard } from "./amazing-card.js";
import { Card } from "./new-class.js";

const numberArray = Array.from({ length: 20 }, (_, i) => i + 1).flatMap(n => [n, n]);
const imageArray = Array.from({ length: 20 }, (_, i) => `./img/${i}.png`).flatMap(n => [n, n]);
const page = document.querySelector('.page');
const btnNum = document.querySelector('.btn-num');
const btnImg = document.querySelector('.btn-img');
const input = document.getElementById('inp');
const num = document.querySelector('.num');
const game = document.querySelector('.game__over');
const win = document.querySelector('.game__win');

let current = parseInt(num.innerHTML);
let timerId;
let finalTime = 0;
let cardSucces = []
let openedCards = [];

const initialCount = current;

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

const timer = () => {
    current = current - 1;
    if (current >= 0) {
        num.innerHTML = current;
        timerId = setTimeout(timer, 1000);
    }
}

const resetTimer = () => {
    clearTimeout(timerId);
    current = initialCount;
    num.innerHTML = finalTime;
}

function createCard(cards, inputValue) {
    const inps = inputValue * 2;
    let shuffledArr

    cards === AmazingCard ? shuffledArr = shuffle(imageArray.slice(0, inps)) : shuffledArr = shuffle(numberArray.slice(0, inps));

    for (const cardNumber of shuffledArr) {
        const card = new cards(page, cardNumber, function(card) {
            if (!card.open && !card.success) {
                card.open = true;
                openedCards.push(card);
                if (openedCards.length <= 2) {
                    if (openedCards.length === 2) {
                        if (openedCards[0].cardNumber === openedCards[1].cardNumber) {
                            openedCards.forEach(card => {
                                card.success = true;
                                cardSucces.push(card);
                            });
                            openedCards = [];
                            if (cardSucces.length === shuffledArr.length) {
                                win.style.display = 'block'
                                finalTime = current;
                                resetTimer();
                                cardSucces = [];
                            }
                        } else {
                            setTimeout(() => {
                                openedCards.forEach(card => {
                                    card.open = false;
                                    card.success = false;
                                });
                                openedCards = [];
                            }, 1000);
                        }
                    }
                } else {
                    card.open = false;
                }
            }
        });
        setTimeout(() => {
            if (current === 0 && cardSucces.length !== shuffledArr.length) {
                cardSucces = [];
                game.style.display = 'block'
                page.classList.add('over')
            }
        }, initialCount * 1000);
    }
}

function startGame(cards) {
    const inputValue = parseInt(input.value);
    if ([2, 4, 6, 8, 10].includes(inputValue)) {
        game.style.display = 'none'
        win.style.display = 'none'
        page.classList.remove('over')
        page.innerHTML = '';
        cardSucces = [];
        resetTimer();
        timer();
        createCard(cards, inputValue)
    } else {
        alert("Введите число 2, 4, 6, 8 или 10");
    }
}

btnNum.addEventListener('click', () => {
    startGame(Card)
});
btnImg.addEventListener('click', () => {
    startGame(AmazingCard)
});