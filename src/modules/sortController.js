function sorter(tableRowsSorted, index, dataSort) {
  let factor = dataSort === 'up' ? 1 : -1;
  return tableRowsSorted.sort((first, second) => {
    let firstElement = first.childNodes[index].textContent;
    let secondElement = second.childNodes[index].textContent;
    if (index === 5) {
      firstElement = +firstElement.slice(0, firstElement.length - 1);
      secondElement = +secondElement.slice(0, secondElement.length - 1);
    }
    if (index > 2 && index < 5) {
      firstElement = +firstElement;
      secondElement = +secondElement;
    }
    if (firstElement > secondElement) {
      return 1 * factor;
    }
    if (firstElement < secondElement) {
      return -1 * factor;
    }
    return 0;
  });
}

function prepareToSort(table, target, dataSort) {
  let tableRows = table.querySelectorAll('.table__row');
  let tableRowHead = table.querySelector('.table__row-head');
  let index = Array.from(tableRowHead.childNodes).indexOf(target);
  let tableRowsSorted = Array.from(tableRows);
  tableRowsSorted = sorter(tableRowsSorted, index, dataSort);
  tableRows.forEach(tableRow => tableRow.remove());
  tableRowsSorted.forEach(tableRowSorted => table.append(tableRowSorted));
}

export default function sortController(target) {
  const table = target.parentNode.parentNode;
  const tableHeaders = target.parentNode.childNodes;
  const dataSort = target.dataset.sort;
  tableHeaders.forEach(header => header.setAttribute('data-sort', 'no'));
  switch (dataSort) {
    case 'up':
      target.setAttribute('data-sort', 'down');
      break;
    case 'down':
      target.setAttribute('data-sort', 'up');
      break;
    default:
      target.setAttribute('data-sort', 'up');
      break;
  }
  prepareToSort(table, target, target.dataset.sort);
}
