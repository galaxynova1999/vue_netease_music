<template>
  <div class="main">
    <audio style="display: none" :src="src" ref="music" />
    <div class="left">
      <v-img
        lazy-src="https://picsum.photos/id/11/10/6"
        height="60"
        max-width="60"
        :src="pic"
        style="border-radius: 5px"
      />
      <div class="left-content">
        <span>{{ name }}</span>
        <span>{{ author }}</span>
      </div>
    </div>
    <div class="middle">
      <v-btn icon color="primary" large>
        <v-icon x-large>mdi-skip-previous</v-icon>
      </v-btn>
      <template>
        <v-btn
          icon
          color="primary"
          x-large
          @click="handlePlay"
          v-if="playStatus === 'PLAYING'"
        >
          <v-icon style="font-size: 50px">mdi-pause-circle</v-icon>
        </v-btn>
        <v-btn icon color="primary" x-large @click="handlePlay" v-else>
          <v-icon style="font-size: 50px">mdi-play-circle</v-icon>
        </v-btn>
      </template>
      <v-btn icon color="primary" large>
        <v-icon x-large>mdi-skip-next</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { PAUSE, WAITING } from "@/util/constant";
const { mapState, mapMutations } = createNamespacedHelpers("song");
export default {
  name: "Footer",
  data: () => ({
    currentTime: "00:00",
    currentValue: 0,
    mute: false,
    volume: 50,
    playListOpen: false,
  }),
  methods: {
    ...mapMutations(["changePlayStatusToPlaying", "changePlayStatusToPause"]),
    handlePlay() {
      if (!this.$refs.music) {
        return;
      }
      const { music: player } = this.$refs;
      if (this.playStatus === WAITING || this.playStatus === PAUSE) {
        player.play();
        this.changePlayStatusToPlaying();
      } else {
        player.pause();
        this.changePlayStatusToPause();
      }
    },
  },
  computed: {
    ...mapState({
      src: (state) => state.src,
      pic: (state) => state.pic,
      name: (state) => state.name,
      author: (state) => state.author,
      playStatus: (state) => state.playStatus,
    }),
  },
  created() {
    this.$store.dispatch("song/getSong", "431085465");
  },
  mounted() {},
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  height: 64px;
  width: 100%;
  background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  z-index: 1;
  justify-content: flex-start;
}
.left {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 20px;
  flex-basis: 250px;
}
.left-content {
  margin-left: 12px;
}
.left-content span:first-child {
  font-size: 14px;
  max-height: 40px;
  display: block;
  overflow: hidden;
  word-break: break-all;
}
.left-content span:last-child {
  font-size: 12px;
  color: rgb(186, 186, 186);
  height: 24px;
}
.middle {
  display: flex;
  justify-content: space-between;
  flex-basis: 200px;
  align-items: center;
}
</style>
