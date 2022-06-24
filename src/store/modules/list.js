import Axios from "axios";
import { environment } from "../../environments/environments.js";
import { getList, getASpecificList } from "../../api/listService.js";

const state = {
  users: [],
  tweets: [],
  listsForNav: [],
};

const mutations = {
  setUsers(state, tw) {
    state.users = tw;
  },
  setTweets(state, tw) {
    state.tweets.push(tw);
  },
  clearToShowNewTweetList(state) {
    state.tweets = [];
  },
  setListsForNav(state, lists) {
    state.listsForNav = lists;
  },
};

const actions = {
  async getTweetFromTw(context, users) {
    for (const tw of users) {
      Axios.get(`${environment.backend}/api/tweet?myList=${tw}`)
        .then((tweet) => {
          context.commit("setTweets", tweet.data);
        })
        .catch((e) => console.log(e));
    }
  },
  async getListsForNav(context, user) {
    const lists = await getList(user);
    context.commit("setListsForNav", lists);
  },
  // add new users
  async getSpecificList(context, list) {
    const specifi = await getASpecificList(list);
    context.commit("setUsers", specifi);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
