<template>
   <v-app-bar color="primary" app>
     <img
         src="../../assets/image/logo.png"
         alt=""
         style="max-width: 120px;display: none"
         class="ml-3"
     >
     <div class="ml-7" @click="goBack">
       <v-btn icon>
         <v-icon color="grey lighten-4" large>mdi-arrow-left-thick</v-icon>
       </v-btn>
       <v-btn icon @click="goForward">
         <v-icon color="grey lighten-4" large>mdi-arrow-right-thick</v-icon>
       </v-btn>
     </div>
     <div class="ml-9">
        <SearchInput/>
     </div>
   </v-app-bar>
</template>

<script>
import SearchInput from "@/components/searchInput/index";
export default {
  name: "Header",
  components: {SearchInput},
  data:() => ({

  }),
  methods:{
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    }

  }
}
</script>

<style scoped>

</style>
