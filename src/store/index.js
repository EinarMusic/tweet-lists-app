import { createStore } from "vuex";

import { getListTweets } from "../api/tweetService.js";

export default createStore({
  strict: true,
  state: {
    users: null
  },
  mutations: {
    getUsers(state, users) {
      state.users = users;
    }
  }
});
