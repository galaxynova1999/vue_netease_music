function setUserDetail(data) {
   localStorage.setItem("userid",data.account.id);
   localStorage.setItem("username",data.account.userName);
   localStorage.setItem("nickname",data.profile.nickname);
   localStorage.setItem("avatar",data.profile.avatarUrl);
}

function getUserID() {
  return parseInt(localStorage.getItem("userid"));
}

function getUserName() {
  return localStorage.getItem("username");
}

function getNickName() {
 return localStorage.getItem("nickname");
}

function getAvatar() {
 return localStorage.getItem("avatar");
}

function clearUser() {
    localStorage.setItem("userid",null);
    localStorage.setItem("username",null);
    localStorage.setItem("nickname",null);
    localStorage.setItem("avatar",null);
}



export {
    getAvatar,
    getNickName,
    getUserID,
    getUserName,
    clearUser,
    setUserDetail,
}
