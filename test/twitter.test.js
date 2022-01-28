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
		threadCheck[0].data.text.should.equal(
			"This is fkin nonsense. Once again: every other browser has already done this. Get rid of the third party cookie. Trying to sue Google to stop this is confused nonsense. https://t.co/UTK0OfeMxg"
		);
	});
});
