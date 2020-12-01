<template>
  <v-container fluid>
    <v-card
      elevation="0"
      style="display: flex; align-items: center; justify-content: flex-start"
    >
      <div style="padding: 20px 30px 20px 40px">
        <v-img
          width="225"
          height="225"
          style="border-radius: 10px"
          :src="coverUrl"
          lazy-src="https://picsum.photos/id/11/10/6"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
      <div style="height: 225px">
        <div>
          <span class="list-type">
            {{ type === "song" ? "歌单" : "专辑" }}
          </span>
          <span style="font-size: 20px; font-weight: 800">
            {{ details.name }}
          </span>
        </div>
        <div style="display: flex; align-items: center" v-if="type === 'song'">
          <v-img
            :src="details.creator.avatarUrl"
            width="40"
            height="40"
            style="border-radius: 50%; align-self: baseline"
            lazy-src="https://picsum.photos/id/11/10/6"
          />
          <span style="margin-left: 10px; font-size: 0.9rem">
            {{ details.creator.nickname }}
          </span>
          <span style="margin-left: 20px; font-size: 0.9rem">
            {{ moment(details.createTime).format("YYYY-MM-DD") }}创建
          </span>
        </div>
        <div>
          <v-btn>播放全部</v-btn>
          <v-btn>收藏</v-btn>
        </div>
        <template v-if="type === 'song'">
          <div style="font-size: 0.95rem">
            <div>
              <span>歌曲数</span>
              <span>{{ details.trackCount }}</span>
              <span>播放数</span>
              <span>{{ details.playCount }}</span>
            </div>
            <div>
              <span>简介</span>
              <span v-if="details.description">{{ details.description }}</span>
              <span v-else>添加简介</span>
            </div>
            <div>
              <span>标签</span>
              <span v-if="details.tags && details.tags.length > 0">
                {{ details.tags.join("/") }}
              </span>
              <span v-else> 添加标签 </span>
            </div>
          </div>
        </template>
      </div>
    </v-card>
    <v-tabs fixed-tabs v-model="tab">
      <v-tab key="song"> 歌曲列表 </v-tab>
      <v-tab key="comment"> 评论 </v-tab>
      <v-tab key="other"> 收藏者 </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="song">
        <v-data-table
          :headers="column"
          :items="songs"
          disable-filtering
          disable-sort
          :loading="fetching"
          hide-default-footer
          disable-pagination
          calculate-widths
          @dblclick:row="handleChooseSong"
        >
          <template v-slot:item.op="{ item }">
            <v-icon color="primary" v-if="currentID === item.id" size="22"
              >mdi-play</v-icon
            >
            <span v-else>{{ item.index }}</span>
            <v-icon color="grey" size="22" class="ml-3">mdi-download</v-icon>
          </template>
          <template v-slot:item.title="{ item }">
            <span>{{ item.name }}</span>
            <span style="color: #bababa" v-if="item.alia.length !== 0"
              >({{ item.alia.join("/") }})
            </span>
            <v-icon
              v-if="item.mv"
              color="primary"
              class="pl-2"
              style="cursor: pointer"
              >mdi-youtube</v-icon
            >
          </template>
          <template v-slot:item.artist="{ item }">
            <span v-for="(artist, index) of item.ar">
              <span class="list-item" @click="changeRouteToSinger(artist.id)">{{
                artist.name
              }}</span>
              <template v-if="index !== item.ar.length - 1"> / </template>
            </span>
          </template>
          <template v-slot:item.album="{ item }">
            <span @click="changeRouteToAlbums(item.al.id)" class="list-item">{{
              item.al.name
            }}</span>
          </template>
          <template v-slot:item.duration="{ item }">
            <span>{{ formatDuration(item.dt) }}</span>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { getPlayListDetail } from "@/api/network/PlayList";
import { ALBUM, SONG } from "@/util/constant";
import { getSongByTrackID } from "@/api/exposed";
import { getAlbumDetail, getAlbumInfo } from "@/api/network/Album";
import { formatSongDuration } from "@/util/convenience";
import { mapActions, mapState } from "vuex";

export default {
  name: "PlayList",
  data: () => ({
    type: "",
    tab: "",
    details: [],
    songs: [],
    fetching: false,
    info: {},
    column: [
      {
        text: "操作",
        value: "op",
        width: 80,
        align: "center",
      },
      {
        text: "音乐标题",
        value: "title",
        width: 300,
      },
      {
        text: "歌手",
        value: "artist",
        width: 120,
      },
      {
        text: "专辑",
        value: "album",
        width: 250,
      },
      {
        text: "时长",
        value: "duration",
        width: 70,
      },
    ],
  }),
  created() {
    this.formatDuration = formatSongDuration;
    this.fetchData();
  },
  methods: {
    ...mapActions("song", ["getSong"]),
    fetchData() {
      this.fetching = true;
      const { id, type } = this.$route.params;
      if (type === SONG) {
        this.type = SONG;
        getPlayListDetail(id).then((res) => {
          const { playlist } = res;
          this.details = playlist;
          let tracksID = [];
          const { tracks } = playlist;
          for (let i = 0; i < tracks.length; i++) {
            tracksID.push(tracks[i].id);
          }
          getSongByTrackID(tracksID).then((res) => {
            this.fetching = false;
            this.songs = res.songs.map((item, index) => {
              return {
                ...item,
                index: index < 10 ? "0" + index : index,
              };
            });
          });
        });
      } else {
        this.type = ALBUM;
        Promise.all([getAlbumDetail(id), getAlbumInfo(id)]).then(
          ([detail, info]) => {
            const { songs, album } = detail;
            this.details = album;
            this.songs = songs;
            this.info = info;
            this.fetching = false;
          }
        );
      }
    },
    handleChooseSong(e, { item }) {
      this.getSong(item.id);
    },
  },
  watch: {
    $route() {
      this.songs = [];
      this.details = [];
      this.info = [];
      this.fetchData();
    },
  },
  computed: {
    ...mapState("song", {
      currentID: (state) => state.id,
    }),
    coverUrl() {
      const { type } = this.$route.params;
      if (type === SONG) {
        return this.createPicURL(this.details.coverImgUrl, 225, 225);
      } else {
        return this.createPicURL(this.details.picUrl, 225, 225);
      }
    },
  },
};
</script>

<style scoped>
.list-item:hover {
  text-decoration: underline;
  cursor: pointer;
}
.list-type {
  width: 50px;
  height: 20px;
  color: rgb(198, 47, 47);
  border: 1px solid rgb(198, 47, 47);
  display: inline-block;
  text-align: center;
  line-height: 20px;
  border-radius: 3px;
  font-size: 14px;
}
.top {
  float: left;
  font-size: 14px;
}
.song-info {
  float: left;
}
</style>
