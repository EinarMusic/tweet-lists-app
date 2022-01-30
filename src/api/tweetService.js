import Axios from "axios";
import { environment } from "../environments/environments.js";
import { organizeTweetDataOfSelectedUsers } from "../feature/feature.js";

function getListTweets(users) {
  const tweets = [];
  const forIteration = [];
  for (const tw of users) {
    Axios.get(`${environment.backend}/api/tweet?myList=${tw}`)
      .then(tweet => {
        forIteration.push(tweet.data);
        tweets.push(organizeTweetDataOfSelectedUsers(forIteration));
        // console.log("SERVICE:", organizeTweetDataOfSelectedUsers(forIteration));
      })
      .catch(e => console.log(e));
  }
  return tweets;
}

export { getListTweets };
