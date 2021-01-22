<template>
  <v-app-bar color="primary" app>
    <div class="ml-3">
      <img src="../../assets/image/logo.png" alt="" style="max-width: 120px" />
    </div>
    <div class="ml-7">
      <v-btn icon @click="goBack">
        <v-icon color="grey lighten-4">mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn icon @click="goForward">
        <v-icon color="grey lighten-4">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
    <div class="ml-9">
      <SearchInput />
    </div>
    <v-spacer />
    <div v-if="isLogin" style="display: flex; align-items: center">
      <v-menu bottom offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-avatar>
            <v-img
              :src="createPicURL(avatar, 50, 50)"
              style="cursor: pointer"
              v-on="on"
            />
          </v-avatar>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-title>个人资料</v-list-item-title>
            </v-list-item>
            <v-dialog v-model="logoutDialogOpen" persistent max-width="290">
              <template v-slot:activator="{ on }">
                <v-list-item v-on="on">
                  <v-list-item-title>退出登录</v-list-item-title>
                </v-list-item>
              </template>
              <v-card>
                <v-card-title class="headline"> 退出登录 </v-card-title>
                <v-card-text>
                  确定要退出登录吗？这将清空当前用户数据
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="logoutDialogOpen = false">
                    取消
                  </v-btn>
                  <v-btn color="primary" text @click="logoutDialogOpen = false">
                    确定
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <span style="margin-left: 10px; color: white">{{ nickname }}</span>
    </div>
    <div v-else>
      <v-bottom-sheet max-width="400" v-model="loginFormOpen" persistent>
        <template v-slot:activator="{ on }">
          <v-btn text color="white" v-on="on"> 登录 </v-btn>
        </template>
        <v-card>
          <v-card-title>登录</v-card-title>
          <v-form ref="loginForm">
            <v-text-field
              label="手机号"
              v-model="phone"
              :rules="phoneRules"
              validate-on-blur
              style="width: 350px; margin: 0 auto"
            />
            <v-text-field
              label="密码"
              v-model="password"
              type="password"
              style="width: 350px; margin: 0 auto"
              :rules="pwdRules"
              validate-on-blur
            />
          </v-form>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="loginFormOpen = false"
              >取消</v-btn
            >
            <v-btn text color="primary" @click="handleLogin">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
    </div>
  </v-app-bar>
</template>

<script>
import SearchInput from "@/components/searchInput/index";
import { mapMutations, mapState } from "vuex";
import { LoginByPhone } from "@/api/network/Login";
import { getUserPlayList } from "@/api/network/User";
import { getUserRecentWeekPlayRecord } from "@/api/network/User";
import { setUserRecentPlayList } from "@/api/local/userPlayRecord";
export default {
  name: "Header",
  components: { SearchInput },
  data: () => ({
    loginFormOpen: false,
    phone: "",
    password: "",
    phoneRules: [
      (value) => !!value || "请输入手机号",
      (value) => /^[1][3456789][0-9]{9}$/.test(value) || "请输入正确的手机号",
    ],
    pwdRules: [(value) => !!value || "请输入密码"],
    logoutDialogOpen: false,
  }),
  computed: {
    ...mapState("login", {
      isLogin: (state) => state.isLogin,
    }),
    ...mapState("user", {
      userID: (state) => state.userID,
      nickname: (state) => state.nickname,
      avatar: (state) => state.avatar,
    }),
  },
  methods: {
    ...mapMutations("login", ["changeLoginState"]),
    ...mapMutations("user", ["updatePlayList", "updateProfile"]),
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
    handleLogin() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }
      LoginByPhone(this.phone, this.password)
        .then((response) => {
          const { cookie, account } = response;
          if (cookie) {
            this.updateProfile(response);
            const { id } = account;
            Promise.all([
              getUserPlayList(id),
              getUserRecentWeekPlayRecord(id),
            ]).then(([playListData, { weekData }]) => {
              this.updatePlayList(playListData);
              setUserRecentPlayList(weekData);
              this.changeLoginState(true);
              this.loginFormOpen = false;
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
