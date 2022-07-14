import pageLoader from './pageLoader';
import popupConstructor, { destroyPopup } from './popupConstructor';
import createDOMElement from './createDOMElement';
import wordStat from './wordStat';

export default class PlayButtonController {
  static objData;

  constructor(objData) {
    this.objData = objData;
    let button = document.querySelector('.main__container--game-button');
    button.replaceWith(button.cloneNode(true));
    button = document.querySelector('.main__container--game-button');
    PlayButtonController.setObjData(objData);
    button.addEventListener('click', () => PlayButtonController.gameButtonClicked());
  }

  static setObjData(objData) {
    this.objData = objData;
  }

  static gameButtonClicked() {
    if (sessionStorage.getItem('gameStarted') === 'false') {
      this.startGame();
      let button = document.querySelector('.main__container--game-button');
      button.textContent = 'Repeat';
    } else {
      this.readWord();
    }
  }

  static startGame() {
    sessionStorage.setItem('gameStarted', 'true');
    sessionStorage.setItem('correctAnswers', '0');
    sessionStorage.setItem('incorrectAnswers', '0');
    this.gameData = Object.create(this.objData);
    this.gameData = this.gameData.sort(() => Math.random() - 0.5);
    this.readWord();
  }

  static answer(value, card) {
    let word = this.gameData[0].title;

    let correctAudio = new Audio('../sounds/correct.mp3');
    let incorrectAudio = new Audio('../sounds/incorrect.mp3');

    let correctAnswers = +sessionStorage.getItem('correctAnswers');
    let incorrectAnswers = +sessionStorage.getItem('incorrectAnswers');

    let starsContainer = document.querySelector('.main__container__stars');
    let starCorrect = createDOMElement('div', 'star --correct');
    let starIncorrect = createDOMElement('div', 'star --incorrect');

    if (word === value) {
      correctAudio.play();
      this.gameData.shift();
      correctAnswers += 1;
      sessionStorage.setItem('correctAnswers', correctAnswers);
      card.classList.add('--correct');
      starsContainer.prepend(starCorrect.cloneNode(true));
      wordStat(word, 'guesses');
      if (this.gameData.length !== 0) {
        setTimeout(() => this.readWord(), 1000);
      } else {
        sessionStorage.setItem('gameStarted', 'false');
        let button = document.querySelector('.main__container--game-button');
        this.finishGame();
        button.textContent = 'Start game';
      }
    } else {
      incorrectAudio.play();
      incorrectAnswers += 1;
      sessionStorage.setItem('incorrectAnswers', incorrectAnswers);
      starsContainer.prepend(starIncorrect.cloneNode(true));
      wordStat(word, 'mistakes');
    }
  }

  static readWord() {
    let sound = this.gameData[0].sound;
    let audio = new Audio(sound);
    audio.play();
  }

  static endGame() {
    sessionStorage.setItem('gameStarted', 'false');
  }

  static finishGame() {
    let cardsContainer = document.querySelector('.cards-container');
    let title = document.querySelector('.main__container__title');
    let button = document.querySelector('.main__container--game-button');

    sessionStorage.setItem('gameStarted', 'false');
    let correctAnswers = +sessionStorage.getItem('correctAnswers');
    let incorrectAnswers = +sessionStorage.getItem('incorrectAnswers');

    let starsContainer = document.querySelector('.main__container__stars');

    if (correctAnswers === 8 && incorrectAnswers === 0) {
      popupConstructor(true, correctAnswers, incorrectAnswers);
    } else {
      popupConstructor(false, correctAnswers, incorrectAnswers);
    }
    cardsContainer.innerHTML = '';
    title.textContent = '';
    starsContainer.innerHTML = '';
    button.classList.remove('--mode-play');
    setTimeout(() => {
      pageLoader(0);
      destroyPopup();
    }, 3000);
  }
}
