const defaultStat = {
  trained: 0,
  guesses: 0,
  mistakes: 0
};

function setStat(word, stat) {
  localStorage.setItem(`stat-${word}`, JSON.stringify(stat));
}
function getStat(word) {
  return JSON.parse(localStorage.getItem(`stat-${word}`));
}

export default function wordStat(word, type) {
  if (!getStat(word)) {
    setStat(word, defaultStat);
  }
  let wordLocalStorage = getStat(word);
  if (arguments.length === 1) {
    return [wordLocalStorage.trained, wordLocalStorage.guesses, wordLocalStorage.mistakes];
  }
  wordLocalStorage[type] += 1;
  setStat(word, wordLocalStorage);
  return wordLocalStorage;
}
