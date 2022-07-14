let button = document.querySelector('.header__container__burger-menu');
let nav = document.querySelector('.nav');

let starsContainer = document.querySelector('.main__container__stars');

export default function burgerButtonController() {
  button.addEventListener('click', () => {
    button.classList.toggle('--active');
    nav.classList.toggle('--active');
  });
}

export function closeNavigation() {
  button.classList.remove('--active');
  nav.classList.remove('--active');
  sessionStorage.setItem('gameStarted', 'false');
  starsContainer.innerHTML = '';
}
