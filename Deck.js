"use strict";

class Deck {
    constructor() {
        this.deck = '';
        this.currentCard = '';
        this.nextCard = '';
        this.cardImage = '';
        
        this.newDeck();
    }
    async newDeck() {
       let res = await axios.get(`${baseCardsURL}/deck/new/shuffle/?deck_count=1`)
       this.deck = res.data.deck_id;
       let cardRes = await axios.get(`${baseCardsURL}/deck/${this.deck}/draw/?count=1`)
       this.nextCard = cardRes.data.cards[0].code;
       this.cardImage = cardRes.data.cards[0].image;
       console.log("newDeck", "nextCard:", this.nextCard, "cardImage", this.cardImage);
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
