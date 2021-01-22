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
      const { subscribed } = item;
      if (subscribed) {
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
    const { account,profile } = data;
    const { id, userName } = account;
    const { nickname, avatarUrl } = profile;
    state.userID = id;
    state.username = userName;
    state.nickname = nickname;
    state.avatar = avatarUrl;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
