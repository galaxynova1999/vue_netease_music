//存放用户最近一周的播放记录 -来自服务器
function setUserRecentPlayList(weekdata) {
  localStorage.setItem("userPlayRecord",JSON.stringify(weekdata));
}

function getUserRecentPlayList() {
  return JSON.parse(localStorage.getItem("userPlayRecord"));
}

function clearUserRecentPlayList() {
    localStorage.setItem("userPlayRecord",null);
}


export {
    getUserRecentPlayList,
    setUserRecentPlayList,
    clearUserRecentPlayList
}
