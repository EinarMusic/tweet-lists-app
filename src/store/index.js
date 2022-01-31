import { createStore } from "vuex";

export default createStore({
  strict: true,
  state: {
    users: null,
    describeList: null,
  },
  mutations: {
    getUsers(state, users) {
      state.users = users;
    },
    getDescriptionList(state, desc) {
      state.describeList = desc;
    },
  },
});
