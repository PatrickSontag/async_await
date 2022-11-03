"use strict";

let baseNumsURL = "http://numbersapi.com/";
let favNumber = 3;

let numberForm = document.getElementById('number-form');
let inputNum;
let numBtn = document.getElementById('number-button');
let triviaHTML = document.getElementById('trivia-list');

let baseCardsURL = "https://deckofcardsapi.com/api"
let deck = "API deck number";
let cardBtn = document. getElementById('card-button');
let cardHTML = document.getElementById('card-pile');
let d = "deck class instance";

async function numberTrivia(num=favNumber) {
    let r1 = await axios.get(`${baseNumsURL}${num}`)
    let r2 = await axios.get(`${baseNumsURL}${num}`)
    let r3 = await axios.get(`${baseNumsURL}${num}`)
    let r4 = await axios.get(`${baseNumsURL}${num}`)
    console.log(r1.data);
    console.log(r2.data);
    console.log(r3.data);
    console.log(r4.data);
    triviaHTML.innerHTML += `<li>${r1.data}</li>`;
    triviaHTML.innerHTML += `<li>${r2.data}</li>`;
    triviaHTML.innerHTML += `<li>${r3.data}</li>`;
    triviaHTML.innerHTML += `<li>${r4.data}</li>`;
}


function cardsAPI() {
    axios
        // .get(`${baseCardsURL}/deck/new/shuffle/?deck_count=1`)
        .get(`${baseCardsURL}/deck/new/draw/?count=1`)
        .then(d1c1 => {
            console.log("from deck call:", d1c1.data.cards[0].code);
            return axios.get(`${baseCardsURL}/deck/new/shuffle/?deck_count=1`)
            // console.log(d.data.deck_id);
            // let deck = d.data.deck_id;
            // return axios.get(`${baseCardsURL}/deck/${deck}/draw/?count=1`)
        })
        .then(d2 => {
            console.log(d2.data.deck_id);
            deck = d2.data.deck_id;
            return axios.get(`${baseCardsURL}/deck/${deck}/draw/?count=1`)
        })
        .then(d2c1 => {
            console.log(d2c1.data.cards[0].code);
            // let deck = c1.data.cards.code;
            return axios.get(`${baseCardsURL}/deck/${deck}/draw/?count=1`)
        })
        .then(d2c2 => {
            console.log(d2c2.data.cards[0].code);
            return axios.get(`${baseCardsURL}/deck/${deck}/draw/?count=1`)
        })
}

addEventListener('load', () => {
    console.log("eventListener Page Load");
    d = new Deck;
    console.log("deck", d);
})

numBtn.addEventListener("click", (e) => {
    e.preventDefault();
    inputNum = document.getElementById('input-number').value;
    numberTrivia(inputNum)
});
// onClick="numberTrivia(${inputNum})"

cardBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("evt listener", d.nextCard);
    d.newCard();
    cardHTML.innerHTML += `<div class="card"><img src="${d.cardImage}" alt=""></div>`;
})

