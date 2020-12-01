import { post } from "@/util/axios";
import { clearUserRecentPlayList } from "../local/userPlayRecord";

function LoginByPhone(phone, pwd) {
  return post("/login/cellphone", {
    phone: phone,
    password: pwd,
    timestamp: new Date().getTime(),
  });
}

function LoginByMail(email, pwd) {
  return post("/login", {
    email: email,
    password: pwd,
  });
}

function LogOut() {
  return post("/logout").then(function () {
    clearUser();
    clearUserRecentPlayList();
    //LoginState.changeState(false);
    //userPlayList.updatePlayList(null,null);
  });
}

export { LoginByMail, LoginByPhone, LogOut };
