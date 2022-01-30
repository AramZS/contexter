var chai = require("chai"),
	expect = chai.expect,
	assert = chai.assert,
	should = chai.should();

const linkModule = require("../src/tweet-archiver");
describe("The Twitter Archive Module", function () {
	// Basic, let's make sure everything is working
	// Some adapted from https://github.com/braintree/sanitize-url/blob/main/src/__tests__/test.ts
	describe("Capture a single tweet", function () {
		this.timeout(60000);
		it("should capture a basic user", async function () {
			const getUser = await linkModule
				.getTwitterClient()
				.userByUsername("chronotope");
			expect(getUser).to.deep.include({
				data: {
					id: "15099054",

					name: "Aram Zucker-Scharff",

					username: "Chronotope",
				},
			});
			const getUserById = await linkModule
				.getTwitterClient()
				.user("15099054");
			expect(getUserById).to.deep.include({
				data: {
					id: "15099054",

					name: "Aram Zucker-Scharff",

					username: "Chronotope",
				},
			});
		});
		it("should capture a single tweet", async function () {
			const getTweet = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1275920609097199628"
			);
			expect(getTweet).to.deep.include({
				data: {
					text: "@swodinsky Everything connected to the internet eventually becomes ads :/",
					referenced_tweets: [
						{ type: "replied_to", id: "1275920325000278020" },
					],
					author_id: "15099054",
					in_reply_to_user_id: "15099054",
					id: "1275920609097199628",
					entities: {
						mentions: [
							{
								start: 0,
								end: 10,
								username: "swodinsky",
								id: "2908572178",
							},
						],
					},
					possibly_sensitive: false,
					conversation_id: "1275917959618232320",
					reply_settings: "everyone",
					created_at: "2020-06-24T22:35:53.000Z",
					source: "Twitter Web App",
				},
				includes: {
					users: [
						{
							username: "Chronotope",
							name: "Aram Zucker-Scharff",
							id: "15099054",
							url: "https://t.co/2rHFiUBQX1",
						},
						{
							username: "swodinsky",
							name: "shoshana wodinsky (she/her)",
							id: "2908572178",
							url: "https://t.co/MYBP7NgPOL",
						},
					],
					tweets: [
						{
							possibly_sensitive: false,
							text: "@swodinsky I think that, unless something changes pretty radically at the regulatory level, that is a fair assumption.  https://t.co/aDY7rAbJYd",
							id: "1275920325000278020",
							source: "Twitter Web App",
							author_id: "15099054",
							in_reply_to_user_id: "2908572178",
							reply_settings: "everyone",
							created_at: "2020-06-24T22:34:45.000Z",
							entities: {
								urls: [
									{
										start: 120,
										end: 143,
										url: "https://t.co/aDY7rAbJYd",
										expanded_url:
											"https://twitter.com/Chronotope/status/1134464455872524288",
										display_url:
											"twitter.com/Chronotope/sta…",
									},
								],
								mentions: [
									{
										start: 0,
										end: 10,
										username: "swodinsky",
										id: "2908572178",
									},
								],
							},
							referenced_tweets: [
								{ type: "quoted", id: "1134464455872524288" },
								{
									type: "replied_to",
									id: "1275919838607794181",
								},
							],
							conversation_id: "1275917959618232320",
						},
					],
				},
			});
		});
	});
	describe("Capture a tweet thread", function () {
		this.timeout(60000);
		it("determine if the top tweet is in a thread", async function () {
			const gotTweet = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1485620069229027329"
			);
			console.log("gotTweet", gotTweet);
			const threadCheck = await linkModule.getTweetThread(gotTweet);
			expect(threadCheck).to.have.length(6);
		});
		it("determine if the bottom tweet is in a thread", async function () {
			const gotTweet = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1485625441230770181"
			);
			console.log("gotTweet", gotTweet);
			const threadCheck = await linkModule.getTweetThread(gotTweet);
			expect(threadCheck).to.have.length(6);
			threadCheck[0].text.should.equal(
				"This is fkin nonsense. Once again: every other browser has already done this. Get rid of the third party cookie. Trying to sue Google to stop this is confused nonsense. https://t.co/UTK0OfeMxg"
			);
		});
		it("determine if the bottom tweet is in a multi-user thread", async function () {
			const gotTweet = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1275920609097199628"
			);
			console.log("gotTweet", gotTweet);
			const threadCheck = await linkModule.getTweetThread(gotTweet);
			expect(threadCheck).to.have.length(8);
			threadCheck[0].text.should.equal(
				`ever since the protests began, i\'ve been thinking a lot about location data: why do so many apps want it? why is it so valuable? \n\ntoday i finally stumbled onto the answer in some 2016 dev doc: turns out location isn\'t just lat/long—it\'s income, interests, political leanings, etc https://t.co/W9I7c824bZ`
			);
		});
	});
	describe("Capture a quoted tweets and quoted thread", function () {
		this.timeout(60000);
		it("should get a quoted tweet id", async function () {
			const gotTweet = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1485620069229027329"
			);
			console.log("gotTweet", gotTweet);
			const quotedId = await linkModule.getQuotedTweetId(gotTweet.data);
			quotedId.should.equal(`1485494070562549760`);
		});
		it("should get a quoted tweet thread", async function () {
			const gotTweet = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1485620069229027329"
			);
			console.log("gotTweet", gotTweet);
			const threadCheck = await linkModule.getQuotedTweet(gotTweet);
			threadCheck.quotedThread[0].text.should.equal(
				`FT: Google is facing a fresh complaint from Germany’s largest publishers and advertisers, which are demanding that the EU intervene over the search giant’s plan to stop the use of third-party cookies.\nhttps://t.co/FKUhvsh4Vo https://t.co/OiHMyKg5Q4`
			);
			threadCheck.quotedThread[
				threadCheck.quotedThread.length - 1
			].text.should.equal(
				`Brussels has already opened an informal inquiry into the search giant’s position in the online market, where it acts as the dominant middleman between advertisers and publishers. This is part of a wider investigation into the way Google collects data that started in 2019.`
			);
		});
		it("should get a quoted tweet thread's full conversation", async function () {
			const gotTweet = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1375079084485709825"
			);
			console.log("gotTweet", gotTweet);
			const threadCheck = await linkModule.getQuotedTweet(gotTweet);
			threadCheck.quotedThread[0].text.should.equal(
				`Medium will fail to on-board &amp; keep pubs from now until eternity for a simple reason: as a VC funded startup it values hype more than profit`
			);
			console.log(
				"quotedConversation",
				threadCheck.quotedConversation,
				threadCheck
			);
			threadCheck.quotedConversation.should.equal(false);
		});
	});
	describe("Capture twitter media", function () {
		this.timeout(60000);
		it("should capture a basic tweet with an image link", async function () {
			const getUser = await linkModule
				.getTwitterClient()
				.singleTweet("1487451928309207047");
			expect(getUser.data.text).to.equal(
				"Hmmm not sure I would want a mortgage from a company also encouraging me to gamble. https://t.co/S9tVJpjeZo"
			);
		});
		it("should get image media from a Tweet", async function () {
			const gotTweet = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1487451928309207047"
			);
			console.log("gotTweet", gotTweet);
			console.dir(gotTweet.data.attachments);
			console.dir(gotTweet.data.entities);
			console.dir(gotTweet.includes.media);
			expect(gotTweet.data.attachments).to.deep.include({
				media_keys: ["3_1487451926233030667"],
			});
			expect(gotTweet.includes.media[0]).to.deep.include({
				media_key: "3_1487451926233030667",
				type: "photo",
				url: "https://pbs.twimg.com/media/FKR9pWOXIAsI9UY.jpg",
			});
			const enrichedTweet = linkModule.enrichTweetWithMedia(
				gotTweet.data,
				gotTweet.includes
			);
			console.dir(enrichedTweet);
			expect(enrichedTweet.attachments.media_keys[0]).to.deep.include(
				gotTweet.includes.media[0]
			);
		});
		it.skip("should get a gif media from a Tweet", async function () {
			const gotTweet = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1486814045038649346"
			);
			console.log("gotTweet", gotTweet);
			console.dir(gotTweet.data.attachments);
			console.dir(gotTweet.data.entities);
			console.dir(gotTweet.includes.media);
			const enrichedTweet = linkModule.enrichTweetWithMedia(
				gotTweet.data,
				gotTweet.includes
			);
			console.dir(enrichedTweet);
			console.dir(enrichedTweet.attachments.media_keys);
			expect(enrichedTweet.attachments.media_keys[0]).to.deep.include(
				gotTweet.includes.media[0]
			);
		});
		it.skip("should get image media from a Tweet search", async function () {
			const searchResult = await linkModule
				.getTwitterClient()
				.search(
					`conversation_id:1486067586118950918 from:Chronotope to:Chronotope`,
					{
						expansions: ["attachments.media_keys"],
						"media.fields": ["type", "url", "alt_text"],
					}
				);
			console.log("Search Result: ");
			console.dir(searchResult);
			console.log("Search Result includes: ");
			console.dir(searchResult.includes.media);
			console.log("Search Result tweets: ");
			console.dir(searchResult.tweets[7]);
			const enrichedTweets = linkModule.enrichTweetsWithMedia(
				searchResult.tweets,
				searchResult.includes
			);
			console.dir(enrichedTweets[7]);
			expect(enrichedTweets[7].attachments.media_keys[0]).to.deep.include(
				{
					media_key: "3_1486070519384399880",
					type: "photo",
					url: "https://pbs.twimg.com/media/FJ-VQ4sWYAge5FS.jpg",
				}
			);
		});
	});
	describe("Capture twitter metadata", function () {
		this.timeout(60000);
		it("should capture take a tweet and get the links within", async function () {
			const getTweet = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1487451928309207047"
			);
			expect(getTweet.data.text).to.equal(
				"Hmmm not sure I would want a mortgage from a company also encouraging me to gamble. https://t.co/S9tVJpjeZo"
			);
			console.dir(getTweet.data.entities);
			const linkSetOne = await linkModule.getLinkFromTweet(getTweet.data);
			expect(linkSetOne).to.have.length(0);

			const getTweetTwo = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1487790307462762498"
			);
			console.dir(getTweetTwo.data.entities);
			expect(getTweetTwo.data.text).to.equal(
				`"It also looks like misinformation and hate speech, which are the very problems that Facebook has had a hand in disseminating, and then swiftly washed its hands off of, will also likely become a hallmark of Horizon Worlds." https://t.co/csLhSgsVy4`
			);
			const linkSetTwo = await linkModule.getLinkFromTweet(
				getTweetTwo.data
			);
			console.dir(linkSetTwo);
			expect(linkSetTwo).to.have.length(1);
			expect(linkSetTwo[0]).to.equal(
				"https://www.thegamer.com/facebooks-horizon-worlds-broken-metaverse-unimaginative-games/"
			);

			const getTweetThree = await linkModule.getTweetByUrl(
				"https://twitter.com/Chronotope/status/1486814045038649346"
			);
			const linkSetThree = await linkModule.getLinkFromTweet(
				getTweetThree.data
			);
			console.dir(linkSetThree);
			expect(linkSetThree).to.have.length(0);

			const getTweetFour = await linkModule.getTweetByUrl(
				"https://twitter.com/keano81/status/1485582987949449220"
			);
			const linkSetFour = await linkModule.getLinkFromTweet(
				getTweetFour.data
			);
			console.dir(linkSetFour);
			expect(linkSetFour).to.have.length(0);
		});
	});
});
