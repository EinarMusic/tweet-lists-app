import Axios from "axios";
import { environment } from "../environments/environments.js";

import { ref, unref, watchEffect } from "vue";

export function userFetch(twOf) {
  const usersDesc = ref([]);
  const error = ref([]);

  function startFetch() {
    usersDesc.value = [];
    error.value = [];

    unref(twOf).forEach((tw) => {
      Axios.get(`${environment.backend}/api/tweet?myList=${tw}`)
        .then((tweet) => {
          usersDesc.value.push(tweet.data.includes.users.find((doc) => doc));
        })
        .catch((err) => (error.value = err));
    });
  }

  watchEffect(startFetch);

  return { usersDesc, error, retry: startFetch };
}
