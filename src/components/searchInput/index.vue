<template>
  <div class="search-input-wrapper">
    <v-menu
        content-class="menu-popover"
        transition="slide-y-transition"
        :offset-y="true"
        :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="搜索音乐，视频，歌词，电台"
            class="search-input"
            :background-color="inputColor"
            dense
            hide-details
            filled
            solo
            flat
            single-line
            v-model="keyword"
            v-on="on"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInputChange"
        />
      </template>

        <template v-if="keyword.length === 0">
          <div class="data">
              <v-list>
                <v-subheader>搜索历史</v-subheader>
                <v-list-item v-if="searchHistory.length === 0">
                  <v-list-item-content>
                    <p style="margin-left: 160px">暂无搜索记录</p>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-else>
                  <v-list-item-content>
                    <v-chip-group column>
                      <v-chip v-for="(item,index) of searchHistory" :key="index" close>
                        {{ item }}
                      </v-chip>
                    </v-chip-group>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-list>
                <v-subheader>热门搜索</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item
                      v-for="word of hotSearch"
                      :key="word.searchWord"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <span style="font-size: 18px">{{word.searchWord}}</span>
                        <span style="margin-left: 10px">{{word.score}}</span>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{word.content}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
          </div>
        </template>
        <template v-else>
          <div>
            <v-list v-if="searchSuggest.songs" dense>
              <v-subheader>单曲</v-subheader>
              <v-list-item-group
                  color="primary"
              >
                <v-list-item
                    v-for="item of searchSuggest.songs"
                    :key="item.id"
                    @click="handleChoose(item.id,'song')"
                >
                  <v-list-item-icon>
                    <v-icon color="grey">mdi-music-note-half</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >
                      {{ item.name}} - {{item.artists[0].name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-list v-if="searchSuggest.albums" dense>
              <v-subheader>专辑</v-subheader>
              <v-list-item-group
                  color="primary"
              >
                <v-list-item
                    v-for="item of searchSuggest.albums"
                    :key="item.id"
                >
                  <v-list-item-icon>
                    <v-icon color="grey">mdi-album</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.name }} - {{item.artist.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </template>
    </v-menu>
  </div>
</template>

<script>
import { getSearchHistory } from '@/api/local/searchHistory';
import {getHotSearch, searchSuggest} from "@/api/network/Search";
import { mapActions } from 'vuex';
export default {
  name: "SearchInput",
  data:() => ({
    keyword:'',
    openPopover:false,
    searchSuggest:[],
    searchHistory:getSearchHistory(),
    hotSearch:[],
    inputColor:'rgba(255,255,255,0.15)',
  }),
  methods:{
   ...mapActions('song',[
       'getSong'
   ]),
   handleFocus() {
     this.inputColor = 'rgba(255,255,255,0.85)'
     getHotSearch().then((res) => {
       this.hotSearch = res.data;
     })
   },
   handleBlur() {
     this.inputColor = 'rgba(255,255,255,0.15)'
   },
   handleInputChange() {
     if(this.keyword.length === 0){
       return;
     }
     this.searchSuggest = [];
     searchSuggest(this.keyword).then((res) => {
       this.searchSuggest = res.result;
     })
   },
    handleChoose(id,type) {
      switch (type) {
        case 'song': {
          this.getSong(id);
        }
      }
    }
  },
  created() {
   this.handleInputChange = this._.debounce(this.handleInputChange,1000);
  }
}
</script>

<style scoped>
.search-input {
  width: 350px;
}
.menu-popover {
  background-color: white;
}
.data {
  height: 450px;
  width: 450px;
  overflow-y: scroll;
}
.suggest{
  height:35px;
  line-height:35px;
  padding-left:20px;
  text-overflow: clip;
  font-size: 0.85em;
}
.suggest:hover{
  background-color: rgb(237,237,237);
  cursor:pointer;
}
</style>
