import './scss/main.scss';
import { CorrectSound } from './modules/fileLoader';
import switchController from './modules/switchController';
import pageLoader from './modules/pageLoader';
// import homeButtonController from './modules/homeButtonController';
import burgerButtonController from './modules/burgerButtonController';
import navigationController from './modules/navigationController';

sessionStorage.setItem('gameStarted', 'false');
pageLoader(0);
switchController();
// homeButtonController(() => pageLoader(0));
navigationController();
burgerButtonController();

let newS = new Audio(CorrectSound);
newS.play();
