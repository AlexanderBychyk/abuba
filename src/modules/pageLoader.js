import topicData from '../data/topic.json';

import foodData from '../data/topics/food.json';
import familyData from '../data/topics/family.json';
import professionsData from '../data/topics/professions.json';
import toysData from '../data/topics/toys.json';
import colorsData from '../data/topics/colors.json';
import clothesData from '../data/topics/clothes.json';
import feelingsData from '../data/topics/feelings.json';
import petsData from '../data/topics/pets.json';

import CardTopic from './CardTopic';
import CardWord from './CardWord';
import checkSwitch from './checkSwitch';
import PlayButtonController from './PlayButtonController';
import statisticTableConstructor from './statisticTableConstructor';
import statisticButtons, { removeStatisticButtons } from './controllers/statisticButtonsController';

let mainContainer = document.querySelector('.main__container');
let pageTitle = document.querySelector('.main__container__title');
let сardContainer = document.querySelector('.cards-container');
let navItems = document.querySelectorAll('.nav__list--item');

function pageMain(Data) {
  pageTitle.textContent = 'Choose topic';
  CardTopic.resetCardCounter();
  Data.forEach(el => {
    let card = new CardTopic(el);
    сardContainer.append(card.createCard());
  });
}

function pageWords(Data, name) {
  Data.forEach(el => {
    let card = new CardWord(el);
    сardContainer.append(card.createCard());
  });
  // eslint-disable-next-line no-unused-vars
  let gameController = new PlayButtonController(Data);
  pageTitle.textContent = name;
}

function pageStat() {
  pageTitle.textContent = 'Statistics';
  сardContainer.classList.add('--hide');
  mainContainer.append(statisticTableConstructor(foodData, 'Food'));
  mainContainer.append(statisticTableConstructor(familyData, 'Family'));
  mainContainer.append(statisticTableConstructor(petsData, 'Pets'));
  mainContainer.append(statisticTableConstructor(feelingsData, 'Feelings'));
  mainContainer.append(statisticTableConstructor(professionsData, 'Professions'));
  mainContainer.append(statisticTableConstructor(colorsData, 'Colors'));
  mainContainer.append(statisticTableConstructor(toysData, 'Toys'));
  mainContainer.append(statisticTableConstructor(clothesData, 'Clothes'));
  statisticButtons();
}

export default function pageLoader(pageNumber) {
  removeStatisticButtons();
  if (document.querySelector('.table-container')) {
    document.querySelectorAll('.table-container').forEach(table => table.remove());
  }
  сardContainer.classList.remove('--hide');
  document.querySelector('html').dataset.page = pageNumber;
  сardContainer.innerHTML = '';

  switch (pageNumber) {
    case 0:
      pageMain(topicData);
      break;
    case 1:
      pageWords(foodData, topicData[pageNumber - 1].title);
      break;
    case 2:
      pageWords(familyData, topicData[pageNumber - 1].title);
      break;
    case 3:
      pageWords(petsData, topicData[pageNumber - 1].title);
      break;
    case 4:
      pageWords(feelingsData, topicData[pageNumber - 1].title);
      break;
    case 5:
      pageWords(professionsData, topicData[pageNumber - 1].title);
      break;
    case 6:
      pageWords(colorsData, topicData[pageNumber - 1].title);
      break;
    case 7:
      pageWords(toysData, topicData[pageNumber - 1].title);
      break;
    case 8:
      pageWords(clothesData, topicData[pageNumber - 1].title);
      break;
    case 9:
      pageStat();
      break;
    default:
      pageTitle.textContent = 'Page not exists';
      break;
  }

  navItems.forEach(item => item.classList.remove('--active'));
  navItems[pageNumber].classList.add('--active');
  checkSwitch();
}
