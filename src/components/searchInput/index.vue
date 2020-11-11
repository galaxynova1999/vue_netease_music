<template>
  <v-autocomplete
      class="search-input mx-4"
      @click="handleClick"
      color="white"
      :loading="loading"
      :items="searchResult"
      :search-input="keyword"
      no-filter
      hide-details
      label="搜索音乐，视频，歌词，电台"
      rounded
      dense
      filled
  >
    <template v-slot:no-data>
      <div class="no-data">
        <p style="margin: 10px 0 5px 10px">搜索历史</p>
        <v-divider/>
        <div style="display: flex;flex-wrap: wrap;width: 25vw">
          <div
              v-if="searchResult.length === 0"
              style="width: 100%;height: 5vw;display: flex;align-items: center"
          >
            <p style="margin-left: 180px">暂无搜索记录</p>
          </div>
          <template v-else>
               <v-chip v-for="item of searchResult" :key="item" close>
                  {{ item }}
               </v-chip>
          </template>
        </div>
        <v-divider/>
        <p style="margin: 10px 0 5px 10px">热门搜索</p>
        <div style="width: 30vw;display: flex;flex-direction: column">
           <div v-for="word of hotSearch" style="width: 100%;height: 75px">

           </div>
        </div>
      </div>
    </template>
  </v-autocomplete>
</template>

<script>
import { getSearchHistory } from '@/api/local/searchHistory'
import {getHotSearch} from "@/api/network/Search";
export default {
  name: "SearchInput",
  data:() => ({
    keyword:'',
    loading:false,
    searchResult:[],
    searchHistory:getSearchHistory(),
    hotSearch:[]
  }),
  methods:{
   handleClick() {
     getHotSearch().then((res) => {
       this.hotSearch = res;
     })
   }
  },
  created() {

  }
}
</script>

<style scoped>
.search-input {
  width: 350px;
  background-color: rgba(255,255,255,0.15);
}
.search-input:hover {
  background-color: rgba(255,255,255,0.25);
}
.no-data {
  width: 30vw;
  height: 550px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
