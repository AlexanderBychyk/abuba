export default function homeButtonController(func) {
  let homeButton = document.querySelector('.header__container__home-button');
  homeButton.addEventListener('click', func);
}
