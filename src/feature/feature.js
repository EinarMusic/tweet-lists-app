/* organize tweet data of the users */

// get only user infomation from selected users.
function getInformationFromSelectedUsers(tweets) {
  const users = tweets.map(doc => {
    return doc.includes.users;
  });

  return users.flat();
}

function getUserMedia(tweet) {
  return tweet
    .map(media => {
      return media.includes.media;
    })
    .flat();
}

// organize information and tweet data of selected users.
function organizeTweetDataOfSelectedUsers(tweets) {
  const plus = [];
  let mediaCount = 0;
  for (const tw in tweets) {
    for (const data of tweets[tw].data) {
      if (data.attachments != undefined) {
        mediaCount++;
      }

      plus.push({
        users: getInformationFromSelectedUsers(tweets)[tw],
        author_id: data.author_id,
        media:
          data.attachments != undefined ? getUserMedia(tweets)[mediaCount] : "",
        //
        attachments:
          data.attachments != undefined ? data.attachments.media_keys : "",
        //
        created_at: data.created_at,
        tweet_id: data.id,
        text: data.text,
        public_metrics: data.public_metrics,
        referenced_tweets:
          data.referenced_tweets != undefined
            ? data.referenced_tweets
            : [{ type: "normal", id: "none" }],
        //
        in_reply_to_user_id: data.in_reply_to_user_id
        //
        // urls: data.entities.urls != undefined ? data.entities.urls : ""
      });
    }
  }
  return plus;
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
                : ""
          };
        } else {
          url = "";
        }
      }
    }
  }

  return {
    users: users,
    data: {
      created_at: sp.created_at,
      text: sp.text,
      public_metrics: sp.public_metrics,
      tweet_id: sp.id
    },
    media: media,
    urls: url
  };
}

export { organizeTweetDataOfSelectedUsers, forSpecificTweet };
