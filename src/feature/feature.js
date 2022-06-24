/* organize tweet data of the users */

// get only user infomation from selected users.
const userInfo = (tw) => tw.map((doc) => doc.includes.users).flat();

const userMedia = (tw) => tw.map((media) => media.includes.media ?? "").flat();

const toMilliseconds = (time) => new Date(time).getTime();

const filterUserMedia = (media, att) => {
  return media.filter((m) => m.media_key == att).find((data) => data);
};

const sortTweets = (tw) => {
  return tw.sort(
    (a, b) => toMilliseconds(a.created_at) - toMilliseconds(b.created_at)
  );
};

// organize information and tweet data of selected users.
function organizeTweetDataOfSelectedUsers(tweets) {
  const plus = [];

  tweets.forEach((tw, index) => {
    tweets[index].data.forEach((data) => {
      plus.push({
        author_id: data.author_id,
        users: userInfo(tweets)[index],
        media:
          filterUserMedia(userMedia(tweets), data.attachments?.media_keys) ||
          "",
        attachments: data.attachments?.media_keys || "",
        created_at: data.created_at,
        tweet_id: data.id,
        text: data.text,
        public_metrics: data.public_metrics,
        referenced_tweets: data.referenced_tweets ?? [
          { type: "normal", id: "none" },
        ],
        in_reply_to_user_id: data.in_reply_to_user_id,
        //
        // urls: data.entities.urls != undefined ? data.entities.urls : ""
      });
    });
  });

  return sortTweets(plus);
}

/* organize specific tweet data */

// specific tweet: take objects.
function iterateToGetObject(objs) {
  if (objs !== undefined) {
    for (const obj of objs) {
      return obj;
    }
  }
}

// specific tweet: organize tweet data
function forSpecificTweet(tweet) {
  const sp = iterateToGetObject(tweet.data);

  let users = {};
  let media = {};
  if (tweet.includes != undefined) {
    users = iterateToGetObject(tweet.includes.users);
    media = iterateToGetObject(tweet.includes.media);
  } else {
    users = "";
    media = "";
  }

  let url = {};
  if (iterateToGetObject(tweet.data) != undefined) {
    if (iterateToGetObject(tweet.data).entities != undefined) {
      if (iterateToGetObject(tweet.data).entities.urls != undefined) {
        if (
          iterateToGetObject(iterateToGetObject(tweet.data).entities.urls) !=
          undefined
        ) {
          const urls = iterateToGetObject(
            iterateToGetObject(tweet.data).entities.urls
          );

          url = {
            title: urls.title,
            display_url: urls.display_url,
            description: urls.description,
            images:
              iterateToGetObject(urls.images) != undefined &&
              iterateToGetObject(urls.images).url != undefined
                ? iterateToGetObject(urls.images).url
                : "",
          };
        } else {
          url = "";
        }
      }
    }
  }

  // console.log({
  //   users: users,
  //   data: {
  //     created_at: sp.created_at,
  //     text: sp.text,
  //     public_metrics: sp.public_metrics,
  //     tweet_id: sp.id,
  //   },
  //   media: media,
  //   urls: url,
  // });

  return {
    users: users,
    data: {
      created_at: sp.created_at,
      text: sp.text,
      public_metrics: sp.public_metrics,
      tweet_id: sp.id,
    },
    media: media,
    urls: url,
  };
}

///////////

// function forSpecificTweet(tweet) {
//   const { created_at, text, public_metrics, id } = tweet.data.find((tw) => tw);
//   let urls = {};

//   tweet.data.forEach((tw) => {
//     urls = tw.entities?.urls
//       .map((url) => {
//         return {
//           title: url.title,
//           description: url.description,
//           display_url: url.display_url,
//           image: url?.images.find((img) => img).url || "",
//         };
//       })
//       .find((data) => data);
//   });

//   return {
//     users: userInfo([tweet]).find((info) => info),
//     data: { created_at, text, public_metrics, tweet_id: id },
//     urls: urls || "",
//     media: userMedia([tweet]).find((media) => media),
//   };
// }

export { organizeTweetDataOfSelectedUsers, forSpecificTweet };
