import { closeNavigation } from './burgerButtonController';
import pageLoader from './pageLoader';

export default function navigationController() {
  let navItems = document.querySelectorAll('.nav__list--item');
  navItems.forEach((navItem, index) => navItem.addEventListener('click', () => {
    pageLoader(index);
    closeNavigation();
  }));
}
