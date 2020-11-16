import {calcSecond} from "@/util/convenience";
import {PAUSE, PLAYING, WAITING} from "@/util/constant";
import {addNewSong} from "@/api/local/localPlayRecord";
import {getSong} from "@/api/exposed";

const state = () => ({
    id: "",
    name: "",
    author: "",
    pic: "",
    totalTime: "",
    src: "",
    playStatus: WAITING,
    lyric: "",
    comments: {
        hotComments:[],
        comments:[]
    },
    totalSecond: 0,
    currentIndexInPlayList : 0,
});

const actions = {
    getSong({ commit },payload) {
        getSong(payload).then((res) => {
            commit('changeSong',res);
        })
    }
}
const mutations = {
    changeSong(state,newSong) {
        if(newSong === null)
            return;
        state.id = newSong.id;
        state.name = newSong.name;
        state.author = newSong.author;
        state.pic = newSong.pic;
        state.totalTime = newSong.totaltime;
        state.src = newSong.src;
        state.playStatus = WAITING;
        state.totalSecond = calcSecond(newSong.totaltime);
        let song = {
            id:newSong.id,
            name:newSong.name
        }
        this.currentIndexInPlayList = addNewSong(song);
    },

    changePlayStatusToPause(state) {
        state.playStatus = PAUSE;
    },

    changePlayStatusToPlaying(state) {
        state.playStatus = PLAYING;
    },

    changePlayStatusToWaiting(state) {
        state.playStatus = WAITING;
    }
}

export default {
    namespaced:true,
    state,
    actions,
    mutations
}
