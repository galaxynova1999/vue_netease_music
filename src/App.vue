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

<style >

</style>
<script>
import Header from "@/components/header/index";
import LeftSide from "@/components/sider/index";
import Footer from "@/components/footer/index";
import {initialLocalData} from "@/api/exposed";
export default {
  components: {Footer, LeftSide, Header},
  created() {
    initialLocalData();
  }
}
</script>
