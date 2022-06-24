const state = {
  user: null,
};

const mutations = {
  userInfo(state, info) {
    state.user = info;
  },
  signOut(state, clear) {
    state.user = clear;
  },
};

const actions = {
  logOut(context) {
    let clear = null;
    context.commit("signOut", clear);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
