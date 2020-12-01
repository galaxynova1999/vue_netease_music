const state = () => ({
  userLikePlayListID: "",
  playList: [],
  subscribedPlayList: [],
  userID: "",
  username: "",
  nickname: "",
  avatar: "",
});

const mutations = {
  updatePlayList(state, data) {
    if (!data) {
      state.playList = null;
      state.subscribedPlayList = null;
      state.userLikePlayListID = null;
      return;
    }
    const { playlist } = data;
    state.userLikePlayListID = playlist[0].id;
    let playList = [];
    let subscribedPlayList = [];
    playlist.slice(1).forEach((item) => {
      if (item.subscribed) {
        subscribedPlayList.push(item);
      } else {
        playList.push(item);
      }
    });
    state.playList = playList;
    state.subscribedPlayList = subscribedPlayList;
  },
  updateProfile(state, data) {
    if (!data) {
      state.userID = null;
      state.username = null;
      state.nickname = null;
      state.avatar = null;
      return;
    }
    state.userID = data.account.id;
    state.username = data.account.userName;
    state.nickname = data.profile.nickname;
    state.avatar = data.profile.avatarUrl;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
