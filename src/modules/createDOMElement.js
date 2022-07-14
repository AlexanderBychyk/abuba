export default function createDOMElement(type, className) {
  let element = document.createElement(type);
  element.className = className;
  return element;
}
