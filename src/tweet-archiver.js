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
	var tweet = await getTwitterClient().tweets([`${tweetID}`]);
	return tweet;
};

module.exports = {
	getTwitterClient,
	getTweetByUrl,
};
