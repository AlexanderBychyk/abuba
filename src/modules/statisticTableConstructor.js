import createDOMElement from './createDOMElement';
import sortController from './sortController';
import wordStat from './wordStat';

const tableHeaders = ['Word', 'Translate', 'Trained', 'Guesses', 'Mistakes', 'Correct'];

function tableHeadersConstructor(count) {
  let docFrag = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    let thElement = createDOMElement('th', 'table__row--head');
    thElement.textContent = tableHeaders[i];
    thElement.dataset.sort = 'no';
    thElement.addEventListener('click', () => sortController(thElement));
    docFrag.append(thElement);
  }
  return docFrag;
}

function tableDataConstructor(value) {
  let td = createDOMElement('td', 'table__row--data');
  td.textContent = value;
  return td;
}

function countPercentage(stat) {
  let percentage = ((stat[1] / (stat[1] + stat[2])) * 100).toFixed();
  return `${percentage === 'NaN' ? 0 : percentage}%`;
}

function tableRowConstructor(count, data) {
  let docFrag = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    let tr = createDOMElement('tr', 'table__row');
    if (i === 0) {
      tr.append(tableHeadersConstructor(6));
      tr.className = 'table__row-head';
    } else {
      let currentData = data[i - 1];
      let stat = wordStat(currentData.title);
      tr.append(tableDataConstructor(currentData.title));
      tr.append(tableDataConstructor(currentData.translate));
      tr.append(tableDataConstructor(stat[0]));
      tr.append(tableDataConstructor(stat[1]));
      tr.append(tableDataConstructor(stat[2]));
      tr.append(tableDataConstructor(countPercentage(stat)));
    }
    docFrag.append(tr);
  }
  return docFrag;
}

export default function statisticTableConstructor(data, title) {
  let tableContainer = createDOMElement('div', 'table-container');
  let tableContainerTitle = createDOMElement('h2', 'table-contaier--title');
  tableContainerTitle.textContent = title;
  let tabelElement = createDOMElement('table', 'table');
  let trElements = tableRowConstructor(9, data);
  tableContainer.append(tableContainerTitle);
  tableContainer.append(tabelElement);
  tabelElement.append(trElements);
  return tableContainer;
}
