class Card {
    constructor(name, url, openImage) {
        this.name = name;
        this.url = url;
        this.card = null;
        this.openImage = openImage;
    }

    like() {
        this.placeCardLikeIcon.classList.toggle("place-card__like-icon_liked");
    }

    remove() {
        this.card.remove();
    }

    createCard() {
        // Переменные для функции
        const newCardContainer = document.createElement('div')
        const linkElement = document.createElement('div')
        const buttonElement = document.createElement('button')
        const placeCardDescription = document.createElement('div')
        const nameElement = document.createElement('h3')
        const placeCardLikeIcon = document.createElement('button')
        newCardContainer.className = 'place-card';

        //ссылка для карточки

        linkElement.className = 'place-card__image';
        linkElement.setAttribute('style', `background-image: url(${this.url})`);
        newCardContainer.append(linkElement);

        buttonElement.className = 'place-card__delete-icon';
        linkElement.append(buttonElement);

        //добавляем див с описанием

        placeCardDescription.className = 'place-card__description';
        newCardContainer.append(placeCardDescription);

        //задаем наименования карточки

        nameElement.className = 'place-card__name';
        nameElement.textContent = this.name;
        placeCardDescription.append(nameElement);

        //кнопка с лайками

        placeCardLikeIcon.className = 'place-card__like-icon';
        placeCardDescription.append(placeCardLikeIcon);
        this.placeCardLikeIcon = placeCardLikeIcon;
        this.card = newCardContainer;


        //слушатели событий
        linkElement.addEventListener('click', () => this.openImage(this.url));
        buttonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            this.remove(); // лишний параметр this
        });
        placeCardLikeIcon.addEventListener('click', this.like.bind(this));

        return this.card;
    }
}