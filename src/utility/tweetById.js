import Axios from "axios";
import { environment } from "../environments/environments.js";
import { forSpecificTweet } from "../feature/feature.js";

import { ref, unref, watchEffect } from "vue";

export function fetchById(twId) {
  const referenced = ref([]);
  const error = ref([]);

  function startFetch() {
    referenced.value = [];
    error.value = [];

    Axios.get(
      `${environment.backend}/api/specific?id=${unref(twId)}`
    ).then((doc) => referenced.value.push(forSpecificTweet(doc.data)));
  }

  watchEffect(startFetch);

  return { referenced, error, retry: startFetch };
}
