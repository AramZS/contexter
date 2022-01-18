// This will work with Node.js on CommonJS mode (TypeScript or not)
const { TwitterApi } = require("twitter-api-v2");

require("dotenv").config();

const getTwitterClient = () => {
	/**
	const apiClient = new TwitterApi({
		appKey: process.env.TWITTER_API_KEY,
		appSecret: process.env.TWITTER_API_SECRET,
		// Following access tokens are not required if you are
		// at part 1 of user-auth process (ask for a request token)
		// or if you want a app-only client (see below)
		accessToken: process.env.TWITTER_ACCESS,
		accessSecret: process.env.TWITTER_ACCESS_SECRET,
	});
	const appOnlyClientFromConsumer = await apiClient.appLogin();
	console.log("appOnlyClientFromConsumer", appOnlyClientFromConsumer);
	 */
	const appOnlyClient = new TwitterApi(process.env.TWITTER_BEARER);
	// const roC = appOnlyClient.readOnly;
	const v2Client = appOnlyClient.v2;
	return v2Client;
};

const getTweetByUrl = async (url) => {
	var tweetID = url.match(/(?<=status\/).*(?=\/|)/i)[0]; // "https://twitter.com/Chronotope/status/1275920609097199628";
	console.log(tweetID);
	var tweet = await getTwitterClient().singleTweet(`${tweetID}`, {
		expansions: [
			"attachments.media_keys",
			"author_id",
			"entities.mentions.username",
			"in_reply_to_user_id",
			"referenced_tweets.id",
			"referenced_tweets.id.author_id",
		],
		"media.fields": ["type", "url", "alt_text"],
		"tweet.fields": [
			"attachments",
			"author_id",
			"context_annotations",
			"conversation_id", // 	The Tweet ID of the original Tweet of the conversation (which includes direct replies, replies of replies).
			"created_at",
			"entities",
			"geo",
			"id",
			"in_reply_to_user_id",
			"possibly_sensitive",
			"referenced_tweets",
			"reply_settings",
			"source",
			"text",
		],
		"user.fields": ["username", "id", "url"],
	});
	/** console.dir(tweet);
	console.dir(tweet.data.referenced_tweets);
	console.dir(tweet.data.entities.mentions);
	console.dir(tweet.includes.users);
	console.dir(tweet.includes.tweets[0]);
	console.dir(tweet.includes.tweets[0].entities.urls);
	console.dir(tweet.includes.tweets[0].entities.mentions); */
	return tweet;
};

module.exports = {
	getTwitterClient,
	getTweetByUrl,
};
