class CardList{
    constructor(container, api, renderCards) {
        this.container = container;
        this.api = api;
        this.renderCards = renderCards;
    }

    addCard(name, link) {
        const card = this.renderCards(name, link)
        this.container.appendChild(card.createCard())
    }

    render() {
       this.api.getCards()
       .then(cards => {
           cards.forEach(data => {
               this.addCard(data.name, data.link)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}