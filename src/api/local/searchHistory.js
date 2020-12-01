function addNewSearchHistory(name) {
  let history = getSearchHistory();
  if (history.includes(name)) {
    return;
  }
  history.push(name);
  localStorage.setItem("searchHistory", JSON.stringify(history));
}
function clearSearchHistory() {
  initSearchHistory();
}

function initSearchHistory() {
  localStorage.setItem("searchHistory", JSON.stringify([]));
}

function delSearchHistory(name) {
  let history = getSearchHistory();
  history.forEach(function (item, index, arr) {
    if (item === name) {
      arr.splice(index, 1);
    }
  });
  localStorage.setItem("searchHistory", JSON.stringify(history));
  return getSearchHistory();
}

function getSearchHistory() {
  if (!localStorage.getItem("searchHistory")) {
    return null;
  }
  return JSON.parse(localStorage.getItem("searchHistory"));
}

export {
  initSearchHistory,
  addNewSearchHistory,
  getSearchHistory,
  delSearchHistory,
  clearSearchHistory,
};
