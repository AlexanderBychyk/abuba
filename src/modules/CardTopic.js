import Card from './Card';
import pageLoader from './pageLoader';

export default class CardTopic extends Card {
  static id = 0;

  constructor({ imageSrc, title }) {
    super(imageSrc);
    this.title = title;
  }

  createCard() {
    let card = super.createCard();

    let cardContainer = document.createElement('div');
    cardContainer.className = 'card__container';

    let cardTitle = document.createElement('h2');
    cardTitle.textContent = this.title;
    cardTitle.className = 'card__title';

    card.append(cardContainer);
    cardContainer.append(cardTitle);

    let id = CardTopic.cardCounter();
    card.id = `topic-card-${id}`;

    card.addEventListener('click', () => pageLoader(id));

    return card;
  }

  static cardCounter() {
    this.id += 1;
    return this.id;
  }

  static resetCardCounter() {
    this.id = 0;
  }
}
