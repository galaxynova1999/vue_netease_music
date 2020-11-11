function setUserPlayList(weekdata) {
  localStorage.setItem("userPlayRecord",JSON.stringify(weekdata));
}

function getUserPlayList() {
  return JSON.parse(localStorage.getItem("userPlayRecord"));
}

function clearUserPlayList() {
    localStorage.setItem("userPlayRecord",null);
}


export {
    getUserPlayList,
    setUserPlayList,
    clearUserPlayList
}
