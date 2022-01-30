// This will work with Node.js on CommonJS mode (TypeScript or not)
const { TwitterApi } = require("twitter-api-v2");

require("dotenv").config();

let twitterClient = false;

const tweetFields = {
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
};

const defaultTweetObj = {
	data: {
		text: "",
		referenced_tweets: [{ type: "replied_to", id: "" }],
		author_id: "",
		in_reply_to_user_id: "",
		id: "",
		entities: {},
		possibly_sensitive: false,
		conversation_id: "",
		reply_settings: "",
		created_at: "",
		source: "Twitter Web App",
	},
	includes: {
		users: [
			{
				username: "",
				name: "",
				id: "",
				url: "",
			},
		],
		tweets: [
			{
				possibly_sensitive: false,
				text: "",
				id: "",
				source: "Twitter Web App",
				author_id: "",
				in_reply_to_user_id: "",
				reply_settings: "everyone",
				created_at: "2020-06-24T22:34:45.000Z",
				entities: {},
				referenced_tweets: [],
				conversation_id: "",
			},
		],
	},
};

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
	const appOnlyClient = twitterClient
		? twitterClient
		: new TwitterApi(process.env.TWITTER_BEARER);
	// const roC = appOnlyClient.readOnly;
	const v2Client = appOnlyClient.v2;
	return v2Client;
};

const getRepliedTo = (tweetData) => {
	if (tweetData.referenced_tweets && tweetData.referenced_tweets.length) {
		const repliedTo = tweetData.referenced_tweets.find((tweet) => {
			if (tweet.type == "replied_to") {
				return true;
			} else {
				return false;
			}
		});
		if (repliedTo) {
			console.log("referenced_tweet 0", repliedTo.id);
			return repliedTo.id;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

const getTweetByUrl = async (url) => {
	var tweetID = url.match(/(?<=status\/).*(?=\/|)/i)[0]; // "https://twitter.com/Chronotope/status/1275920609097199628";
	console.log(tweetID);
	var tweet = await getTwitterClient().singleTweet(`${tweetID}`, tweetFields);
	/** console.dir(tweet);
	console.dir(tweet.data.referenced_tweets);
	console.dir(tweet.data.entities.mentions);
	console.dir(tweet.includes.users);
	console.dir(tweet.includes.tweets[0]);
	console.dir(tweet.includes.tweets[0].entities.urls);
	console.dir(tweet.includes.tweets[0].entities.mentions); */
	return tweet;
};

const getTweetConversation = async (conversation_id) => {};

const getTweetThread = async (tweetObj = defaultTweetObj) => {
	let threadCheck = false;
	let threadFirstCheck = false;
	let conversation = false;
	// const promises = [];
	const tweetData = tweetObj.data ? tweetObj.data : tweetObj;
	const tweetIncludes = tweetObj.includes ? tweetObj.includes : false;
	let userName = "";
	if (tweetIncludes == false) {
		const userNameObj = await getTwitterClient().user(tweetData.author_id);
		userName = userNameObj.data.username;
	} else {
		userName = tweetIncludes.users[0].username;
	}
	if (tweetData.in_reply_to_user_id) {
		threadFirstCheck = true;
	}
	if (
		(tweetIncludes &&
			Array.isArray(tweetIncludes.users) &&
			tweetIncludes.users.length > 0 &&
			tweetIncludes.users[0].users) ||
		(tweetData.in_reply_to_user_id &&
			tweetData.conversation_id != tweetData.id)
	) {
		threadFirstCheck = true;
	}
	if (!threadFirstCheck) {
		console.log(
			"Query: ",
			`conversation_id:${tweetData.conversation_id} to:${userName} from:${userName}`
		);
		conversation = await getTwitterClient().search(
			`conversation_id:${tweetData.conversation_id} to:${userName} from:${userName}`,
			tweetFields
		);
		console.log("conversation check");
		console.dir(conversation);
		if (
			!conversation ||
			!conversation._realData ||
			!conversation._realData.data ||
			conversation._realData.data.length < 1
		) {
			return false;
		}
		const fullConversation = conversation._realData.data;
		fullConversation.push(tweetData);
		console.dir(fullConversation);
		return fullConversation.reverse();
	} else {
		console.dir(tweetData);
		conversation = [tweetData];
		let nextTweet = true;
		while (nextTweet != false) {
			console.log("nextTweet", nextTweet);
			if (nextTweet === true) {
				nextTweet = getRepliedTo(tweetData);
				console.log("nextTweet true", nextTweet);
			}
			var tweet = await getTwitterClient().singleTweet(
				`${nextTweet}`,
				tweetFields
			);
			// promises.push(tweet);
			console.log("tweet true", tweet);
			console.dir(tweet.data.referenced_tweets);
			conversation.push(tweet.data);
			nextTweet = getRepliedTo(tweet.data);
		}
		// await Promise.all(promises);
		return conversation.reverse();
	}
};

// Looking for: { type: 'quoted', id: '1134464455872524288' },
const getQuotedTweetId = (tweetData = defaultTweetObj.data) => {
	// const referencedTweets = tweetObj.data.includes.tweets.referenced_tweets;
	if (tweetData.referenced_tweets && tweetData.referenced_tweets.length) {
		const repliedTo = tweetData.referenced_tweets.find((tweet) => {
			if (tweet.type == "quoted") {
				return true;
			} else {
				return false;
			}
		});
		if (repliedTo) {
			console.log("quoted 0", repliedTo.id);
			return repliedTo.id;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

const getQuotedTweet = async (tweetObj = defaultTweetObj) => {
	const tweetId = getQuotedTweetId(tweetObj.data);
	let tweets = {
		originTweet: tweetObj,
		quotedTweet: false, //tweet,
		quotedThread: false, //threadOfTweets,
		quotedConversation: false,
	};
	if (tweetId === false) {
		return tweets;
	}
	var tweet = await getTwitterClient().singleTweet(`${tweetId}`, tweetFields);
	tweets.quotedTweet = tweet;
	var threadOfTweets = await getTweetThread(tweet);
	if (false != threadOfTweets) {
		tweets.quotedThread = threadOfTweets;
		var conversationOfTweets = await getTweetThread(threadOfTweets[0]);
		if (conversationOfTweets) {
			console.log(
				"conversation",
				threadOfTweets[threadOfTweets.length - 1]
			);
			if (
				conversationOfTweets.length != threadOfTweets.length ||
				threadOfTweets[threadOfTweets.length - 1].text !=
					conversationOfTweets[conversationOfTweets.length - 1].text
			) {
				tweets.quotedConversation = conversationOfTweets;
			}
		}
		return tweets;
	} else {
		return tweets;
	}
};

module.exports = {
	getTwitterClient,
	getTweetByUrl,
	getTweetThread,
	getQuotedTweetId,
	getQuotedTweet,
};
