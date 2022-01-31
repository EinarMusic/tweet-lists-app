import Axios from "axios";
import { environment } from "../environments/environments.js";

function getListTweets(users) {
  const tweets = [];
  for (const tw of users) {
    Axios.get(`${environment.backend}/api/tweet?myList=${tw}`)
      .then((tweet) => {
        tweets.push(tweet.data);
      })
      .catch((e) => console.log(e));
  }
  return tweets;
}

export { getListTweets };
