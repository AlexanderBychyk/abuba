import PlayButtonController from './PlayButtonController';

function toggleMode(switcher, cards, className) {
  if (switcher.checked) {
    cards.forEach(card => card.classList.add(className));
  } else {
    cards.forEach(card => card.classList.remove(className));
  }
}
function toggleButton(switcher, button, className) {
  if (switcher.checked) {
    button.classList.add(className);
  } else {
    button.classList.remove(className);
  }
}

function checkSwitch() {
  let page = document.querySelector('html').dataset.page;
  let switcher = document.querySelector('.switch__selector');
  let playButton = document.querySelector('.main__container--game-button');

  if (+page === 0 || +page === 9) {
    let cards = document.querySelectorAll('.card');
    toggleMode(switcher, cards, 'mode-play');
    playButton.classList.remove('--mode-play');
  } else {
    let cards = document.querySelectorAll('.card-word');
    toggleMode(switcher, cards, 'mode-play');
    toggleButton(switcher, playButton, '--mode-play');
  }
  if (!switcher.checked) {
    PlayButtonController.endGame();
  }
}

export default checkSwitch;
