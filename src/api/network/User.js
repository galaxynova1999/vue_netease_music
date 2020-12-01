import { get, post } from "@/util/axios";

function getUserDetail(id) {
  return get("/user/detail", {
    uid: id,
  });
}

function getUserPlayList(id) {
  return get("/user/playlist", {
    uid: id,
  });
}
function signIn() {
  return post("/daily_signin", {
    type: 1,
  });
}

function getMeCloud() {
  return get("/user/cloud");
}

function getUserDetailCount() {
  return get("/user/subcount");
}

function getUserRecentWeekPlayRecord(id) {
  return get("/user/record", {
    uid: id,
    type: 1,
  });
}

export {
  getUserDetail,
  getUserPlayList,
  signIn,
  getMeCloud,
  getUserRecentWeekPlayRecord,
  getUserDetailCount,
};
