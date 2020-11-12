<template>
  <div>
    <v-list rounded dense :min-height="listHeight" flat>
      <v-subheader>推荐</v-subheader>
      <v-list-item-group
          color="primary"
      >
        <v-list-item to="/discovery" active-class="none" exact-active-class="active-link">
          <v-list-item-icon>
            <v-icon color="grey">mdi-music-note-half</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>发现音乐</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="grey">mdi-music-note-half</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >私人FM</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="grey">mdi-music-note-half</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >视频</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-subheader>我的音乐</v-subheader>
      <v-list-item-group
          color="primary"
      >
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="grey">mdi-music-note-half</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>我的音乐云盘</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="grey">mdi-music-note-half</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >我的收藏</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <template v-if="isLogin">
        <v-subheader>创建的歌单</v-subheader>
        <v-list-item-group
            color="primary"
        >
          <v-list-item :to="`/playlist/song/${userLikePlayListID}`" exact-active-class="active-link">
            <v-list-item-icon>
              <v-icon color="grey">mdi-music-note-half</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>我喜欢的音乐</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="item of playList" :key="item.id" :to="`/playlist/song/${item.id}`" exact-active-class="active-link">
            <v-list-item-icon>
              <v-icon color="grey">mdi-music-note-half</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </template>
      <template v-if="isLogin">
        <v-subheader>收藏的歌单</v-subheader>
        <v-list-item-group
            color="primary"
        >
          <v-list-item v-for="item of subscribedPlayList" :key="item.id" :to="`/playlist/song/${item.id}`" exact-active-class="active-link">
            <v-list-item-icon>
              <v-icon color="grey">mdi-music-note-half</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </template>
    </v-list>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
   name:'LeftSide',
   data:() => ({
     index:1,
     listHeight:document.body.clientHeight - 128
   }),
   computed:{
     ...mapState('login',{
       isLogin:state => state.isLogin
     }),
     ...mapState('user',{
       userLikePlayListID:state => state.userLikePlayListID,
       playList:state => state.playList,
       subscribedPlayList:state => state.subscribedPlayList
     })
   },
  methods:{

  }
}
</script>

<style scoped>

 .active-link {
   background-color: azure;
   transition-property: background-color;
   transition-timing-function: ease;
 }
</style>
