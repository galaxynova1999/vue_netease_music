<template>
  <v-app>
    <div class="top">
      <Header/>
    </div>
    <div class="content">
      <div class="left">
        <LeftSide/>
      </div>
      <div class="right">
        <router-view/>
      </div>
    </div>
    <div class="bottom">
      <Footer/>
    </div>
  </v-app>
</template>

<script>
import Header from "@/components/header/index";
import LeftSide from "@/components/sider/index";
import Footer from "@/components/footer/index";
export default {
  name: "Home",
  components: {Footer, LeftSide, Header},
}
</script>

<style scoped>
.top {
  z-index: 0!important;
  width: 100%;
  height: 64px;
}
.content {
  display: flex;
  width: 100%;
  height: calc(100vh - 128px);
}
.left {
  flex-basis: 18vw;
  overflow-y: scroll;
  overflow-x: hidden;
}
.right {
  flex-basis: 92vw;
  flex-grow: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}
.bottom {
  height: 64px;
  width: 100%;
}
</style>
