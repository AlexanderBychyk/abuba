import { TopicFoodImg } from './fileLoader';

export default class Card {
  constructor(imageSrc) {
    this.imageSrc = imageSrc;
  }

  createCard() {
    let card = document.createElement('div');
    card.className = 'card';

    let cardImage = document.createElement('div');
    // cardImage.style.backgroundImage = `url(${this.imageSrc})`;
    cardImage.style.backgroundImage = `url(${TopicFoodImg})`;
    cardImage.className = 'card__image';

    card.append(cardImage);
    return card;
  }
}
