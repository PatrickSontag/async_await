"use strict";

class Deck {
    constructor() {
        this.deck = this.newDeck();
        this.currentCard = '';
        this.nextCard = '';
        this.cardImage = '';
    }
    newDeck() {
       axios
            .get(`${baseCardsURL}/deck/new/shuffle/?deck_count=1`)
            .then(d => {
                deck = d.data.deck_id;
                this.deck = deck;
                return axios.get(`${baseCardsURL}/deck/${deck}/draw/?count=1`)
            .then(c => {
                this.nextCard = c.data.cards[0].code;
                // let card = c.data.cards[0].code;
                // this.nextCard = card;
                this.cardImage = c.data.cards[0].image;
            })
        })
    }
    newCard() {
        console.log("NEXT card", this.nextCard);
        this.currentCard = this.nextCard;
        this.showCard();
        axios
            .get(`${baseCardsURL}/deck/${deck}/draw/?count=1`)
            .then(c => {
                this.nextCard = c.data.cards[0].code;
                this.cardImage = c.data.cards[0].image;
            })
    }

    showCard() {
        console.log("showCard", this.currentCard);
        console.log("deck", this.deck);
        return this.currentCard;
    }
}

// .get(`${baseCardsURL}/deck/new/shuffle/?deck_count=1`)

// .then(d2 => {
//     console.log(d2.data.deck_id);
//     deck = d2.data.deck_id;
//     return axios.get(`${baseCardsURL}/deck/${deck}/draw/?count=1`)
// })