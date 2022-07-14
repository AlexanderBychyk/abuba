import createDOMElement from './createDOMElement';

export default function popupConstructor(isHappy, correctAnswers, incorrectAnswers) {
  let popup = createDOMElement('div', 'popup');
  let window = createDOMElement('div', 'popup__window');

  let popupImage = createDOMElement('div', isHappy ? 'popup__window--image --happy' : 'popup__window--image --sad');
  let popupInfo = createDOMElement('div', 'popup__window--info');
  let divCorrect = createDOMElement('div', 'popup__window--info-span');
  let divIncorrect = divCorrect.cloneNode(true);
  divCorrect.textContent = `Correct answers: ${correctAnswers}${String.fromCharCode(13)}`;
  divIncorrect.textContent = `Incorrect answers: ${incorrectAnswers}`;

  popup.append(window);
  window.append(popupImage);
  window.append(popupInfo);
  popupInfo.append(divCorrect);
  popupInfo.append(divIncorrect);
  document.body.append(popup);

  let sound = new Audio(`../sounds/${isHappy ? 'victory.wav' : 'fail.wav'}`);
  sound.play();
}

export function destroyPopup() {
  let popup = document.querySelector('.popup');
  popup.remove();
}
