import { createStore } from "vuex";

import list from "./modules/list.js";
import save from "./modules/save.js";
import auth from "./modules/auth.js";

export default createStore({
  strict: true,
  modules: {
    list: list,
    save: save,
    auth: auth,
  },
});
