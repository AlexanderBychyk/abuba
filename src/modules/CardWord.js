import Card from './Card';
import createDOMElement from './createDOMElement';
import playButtonController from './PlayButtonController';
import wordStat from './wordStat';

export default class CardWord extends Card {
  constructor({
    imageSrc, title, translate, sound
  }) {
    super(imageSrc);
    this.title = title;
    this.translate = translate;
    this.sound = sound;
  }

  createCard() {
    let card = createDOMElement('div', 'card-word');
    let cardContent = createDOMElement('div', 'card-word__content');

    let cardFrontPage = createDOMElement('div', 'card-word__face card-word__face--front');
    let cardBackPage = createDOMElement('div', 'card-word__face card-word__face--back');

    let cardImage = createDOMElement('div', 'card-word__image');
    cardImage.style.backgroundImage = `url(${this.imageSrc})`;

    let cardContainerFront = createDOMElement('div', 'card-word__container');
    let cardContainerBack = cardContainerFront.cloneNode(true);

    let cardTitle = createDOMElement('h2', 'card-word__title');
    cardTitle.textContent = this.title;

    let cardTranslate = createDOMElement('h2', 'card-word__title');
    cardTranslate.textContent = this.translate;

    let flipButton = createDOMElement('button', 'card-word__flip-button');
    flipButton.addEventListener('click', () => {
      card.classList.add('--translate');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('--translate');
    });
    cardFrontPage.addEventListener('click', () => {
      if (!card.classList.contains('mode-play')) {
        let audio = new Audio(this.sound);
        audio.play();
        wordStat(this.title, 'trained');
      } else if (sessionStorage.getItem('gameStarted') === 'true' && !card.classList.contains('--correct')) {
        playButtonController.answer(this.title, card);
      }
    });

    card.append(cardContent);
    cardContent.append(cardFrontPage);
    cardFrontPage.append(cardImage);
    cardFrontPage.append(cardContainerFront);
    cardContainerFront.append(cardTitle);
    cardContainerFront.append(flipButton);

    cardContent.append(cardBackPage);
    cardBackPage.append(cardImage.cloneNode(true));
    cardBackPage.append(cardContainerBack);
    cardContainerBack.append(cardTranslate);

    return card;
  }
}
