import checkSwitch from './checkSwitch';
export default function switchController() {
  let switcher = document.querySelector('.switch__selector');
  switcher.checked = false;
  switcher.addEventListener('click', checkSwitch);
}
