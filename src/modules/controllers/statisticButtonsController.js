import createDOMElement from '../createDOMElement';
import pageLoader from '../pageLoader';

function resetButtonClick() {
  localStorage.clear();
  pageLoader(9);
}

function checkButtonToRemove(button) {
  if (button) {
    button.remove();
  }
}

export default function statisticButtons() {
  let buttonsContainer = document.querySelector('.buttons-container');
  let resetButton = createDOMElement('button', 'button buttons-container--reset-button');
  let repeatButton = createDOMElement('button', 'button buttons-container--repeat-difficult-button');

  resetButton.textContent = 'Reset';
  repeatButton.textContent = 'Repeat difficult words';

  resetButton.addEventListener('click', resetButtonClick);

  buttonsContainer.append(resetButton);
  buttonsContainer.append(repeatButton);
}

export function removeStatisticButtons() {
  let resetButton = document.querySelector('.buttons-container--reset-button');
  let repeatButton = document.querySelector('.buttons-container--repeat-difficult-button');
  checkButtonToRemove(resetButton);
  checkButtonToRemove(repeatButton);
}
