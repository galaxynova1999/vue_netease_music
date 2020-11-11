import { post } from "@/util/axios";
import { clearUser } from "../local/Me"
import { clearUserPlayList } from "../local/userPlayRecord";

function LoginByPhone(phone,pwd) {
   return post("/login/cellphone",{
        phone:phone,
        password:pwd,
        timestamp:new Date().getTime()
    })
}

function LoginByMail(email,pwd) {
    return post("/login",{
        email:email,
        password:pwd
    })
}


function LogOut() {
    post("/logout").then(function () {
        clearUser();
        clearUserPlayList();
        //LoginState.changeState(false);
        //userPlayList.updatePlayList(null,null);
    });
}






export {
    LoginByMail,
    LoginByPhone,
    LogOut,
}
