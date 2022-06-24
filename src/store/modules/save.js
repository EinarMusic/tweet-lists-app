import { getSaveList, getASpecificSaveList } from "../../api/saveService.js";

const state = {
  savelistForNavSide: [],
  showSaveList: [],
};

const mutations = {
  setSaveForNav(state, save) {
    state.savelistForNavSide = save;
  },

  setSpecificSave(state, save) {
    state.showSaveList = save;
  },
};

const actions = {
  async getSaveForNav(context) {
    const save = await getSaveList();
    context.commit("setSaveForNav", save);
  },

  async getSpecificSave(context, name) {
    const save = await getASpecificSaveList(name);
    context.commit("setSpecificSave", save);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
