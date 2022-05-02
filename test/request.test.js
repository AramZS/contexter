var chai = require("chai"),
	expect = chai.expect,
	assert = chai.assert,
	eventually = require("chai-as-promised"),
	should = chai.should();

require("dotenv").config();

const linkModule = require("../src/link-request");
describe("The Link Request Module", function () {
	describe("should handle basic requests", function () {
		this.timeout(5000);
		it("should resolve a basic URL", async function () {
			const result = await linkModule.fetchUrl(
				"https://api.github.com/repos/AramZS/devblog/git/refs/heads/main"
			);
			result.status.should.equal(200);
			const textResponse = await result.text();
			// console.log(textResponse);
			textResponse
				.includes(
					'"url":"https://api.github.com/repos/AramZS/devblog/git/refs/heads/main"'
				)
				.should.equal(true);
		});
	});
	it("should return a false on an invalid URL", async function () {
		chai.use(eventually);
		expect(
			linkModule.fetchUrl(
				"https://apiz.githubz.comzs/repos/AramZS/devblog/git/refs/heads/main"
			)
		).to.eventually.throw();
		// result.should.be.false;
	});
	describe("handle oembed requests", function () {
		this.timeout(8000);
		it("should retrieve oembed from a basic URL", async function () {
			const result = await linkModule.fetchOEmbed(
				"https://www.flickr.com/photos/aramzs/33763840540/in/dateposted-public/"
			);
			// console.log(result);
			const htmlResponse = result.html;
			htmlResponse.should.equal(
				'<a data-flickr-embed="true" href="https://www.flickr.com/photos/aramzs/33763840540/" title="upload by AramZS, on Flickr"><img src="https://live.staticflickr.com/2941/33763840540_481ce97db2_z.jpg" width="640" height="640" alt="upload"></a><script async src="https://embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>'
			);
		});
		// https://twitter.com/Chronotope/status/1480225434558210052
		it("should not retrieve oembed from a Facebook URL", async function () {
			const result = await linkModule.fetchOEmbed(
				"https://www.facebook.com/photo/?fbid=10104856317308137&set=pob.15609421"
			);
			console.log("Facebook Result", result);
			result.should.be.false;
		});
	});
	describe("handle an HTML document's metadata", function () {
		const htmlPage = require("./htmlPageSample")([
			"og",
			"json",
			"dc",
			"twitter",
			"basic",
		]);
		const htmlPage2 = require("./htmlPageSample2")([
			"og",
			"json",
			"dc",
			"twitter",
			"basic",
		]);
		const jsdom = require("jsdom");
		const { JSDOM } = jsdom;
		it("should retrieve basic metadata from an HTML document", async function () {
			const jsDom = new JSDOM(htmlPage);
			const result = linkModule.processMetadata(jsDom.window);
			result.metadata.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.metadata.author.should.equal("Aram Zucker-Scharff");
			result.metadata.description.should.equal(
				"Here's how to make Jekyll posts easier for others to see and share on social networks."
			);
			result.metadata.canonical.should.equal(
				"http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html"
			);
			result.metadata.image.should.equal(
				"https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/tumblr_nwncf1T2ht1rl195mo1_1280.jpg"
			);
			//console.dir(result.metadata);
			result.metadata.firstParagraph.should.equal(
				"\n        Nov 11, 20152015-11-11 10:34:51 -0500 • By\n        \n\n          Aram Zucker-Scharff\n        \n        \n          Fight With Tools\n          \n            \n          \n        \n      "
			);
			expect(result.metadata.keywords).to.have.members([
				"jekyll",
				"social-media",
			]);
		});
		it("should retrieve opengraph data from an HTML document", function () {
			const jsDom = new JSDOM(htmlPage);
			const result = linkModule.processMetadata(jsDom.window);
			result.opengraph.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.opengraph.locale.should.equal("en_US");
			result.opengraph.description.should.equal(
				"Here's how to make Jekyll posts easier for others to see and share on social networks."
			);
			result.opengraph.url.should.equal(
				"http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html"
			);
			const jsDom2 = new JSDOM(htmlPage2);
			const result2 = linkModule.processMetadata(jsDom2.window);
			result2.opengraph.url.should.equal("https://conifer.rhizome.org");
			result2.opengraph.description.should.equal(
				"Collect and revisit web pages — Free, open-source web archiving service."
			);
			result2.opengraph.image.should.equal(
				"https://conifer.rhizome.org/static/conifer-social.jpg"
			);
		});
		it("should retrieve opengraph type data from an HTML document", function () {
			const jsDom = new JSDOM(htmlPage);
			const result = linkModule.processMetadata(jsDom.window);
			result.opengraph.typeObject.author.should.equal(
				"http://facebook.com/aramzs"
			);
			result.opengraph.typeObject.published_time.should.equal(
				"2015-11-11 10:34:51 -0500"
			);
			result.opengraph.typeObject.section.should.equal("Code");
			result.opengraph.typeObject.publisher.should.equal(
				"https://www.facebook.com/aramzs"
			);
			expect(result.opengraph.typeObject.tag).to.have.members([
				"jekyll",
				"social-media",
			]);
		});
		it("should retrieve twitter type data from an HTML document", function () {
			const jsDom = new JSDOM(htmlPage);
			const result = linkModule.processMetadata(jsDom.window);
			result.twitter.card.should.equal("summary_large_image");
			result.twitter.creator.should.equal("@chronotope");
			result.twitter.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.twitter.image.should.equal(
				"https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/tumblr_nwncf1T2ht1rl195mo1_1280.jpg"
			);
		});
		it("should retrieve DublinCore type data from an HTML document", function () {
			const jsDom = new JSDOM(htmlPage);
			const result = linkModule.processMetadata(jsDom.window);
			result.dublinCore.Format.should.equal("video/mpeg; 10 minutes");
			result.dublinCore.Language.should.equal("en");
			result.dublinCore.Publisher.should.equal("publisher-name");
			result.dublinCore.Title.should.equal("HYP");
		});
		it("should retrieve JSON LD type data from an HTML document", function () {
			const jsDom = new JSDOM(htmlPage);
			const result = linkModule.jsonData(jsDom.window);
			result["@type"].should.equal("BlogPosting");
			result.headline.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.description.should.equal(
				"Here's how to make Jekyll posts easier for others to see and share on social networks."
			);
			expect(result.image).to.have.members([
				"https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/tumblr_nwncf1T2ht1rl195mo1_1280.jpg",
			]);
		});
		it("should process an HTML document with minimal metadata", function () {
			const htmlPage = require("./htmlPageSample")([]);
			const jsdom = require("jsdom");
			const { JSDOM } = jsdom;
			const jsDom = new JSDOM(htmlPage);
			const jsDomResult = linkModule.jsonData(jsDom.window);
			const result = linkModule.processMetadata(jsDom.window);
			result.metadata.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
		});
		it("should process an HTML document with only OG metadata", function () {
			const htmlPage = require("./htmlPageSample")(["og"]);
			const jsdom = require("jsdom");
			const { JSDOM } = jsdom;
			const jsDom = new JSDOM(htmlPage);
			const jsDomResult = linkModule.jsonData(jsDom.window);
			const result = linkModule.processMetadata(jsDom.window);
			result.opengraph.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
		});
		it("should process an HTML document with only JSON metadata", function () {
			const htmlPage = require("./htmlPageSample")(["json"]);
			const jsdom = require("jsdom");
			const { JSDOM } = jsdom;
			const jsDom = new JSDOM(htmlPage);
			const jsDomResult = linkModule.jsonData(jsDom.window);
			jsDomResult.headline.should.equal(
				"How to make your Jekyll site show up on social"
			);
			jsDomResult.isPartOf.name.should.equal("Fight With Tools");
			jsDomResult.author.name.should.equal("Aram Zucker-Scharff");
			jsDomResult.author.image.url.should.equal(
				"https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/Aram-Zucker-Scharff-square.jpg"
			);
			const result = linkModule.processMetadata(jsDom.window);
			result.metadata.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
		});
		it("should process an HTML document with only OG metadata", function () {
			const htmlPage = require("./htmlPageSample")(["og", "twitter"]);
			const jsdom = require("jsdom");
			const { JSDOM } = jsdom;
			const jsDom = new JSDOM(htmlPage);
			const jsDomResult = linkModule.jsonData(jsDom.window);
			const result = linkModule.processMetadata(jsDom.window);
			result.metadata.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.opengraph.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
		});
		it("should create a readability object from a URL's data", async function () {
			const jsDom = new JSDOM(htmlPage);
			const result = linkModule.readabilityData(jsDom.window);
			result.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.byline.should.equal("Aram Zucker-Scharff");
			expect(result.content).to.have.lengthOf.above(100);
		});
	});
	describe("should create link objects from a domain requests", function () {
		this.timeout(5000);
		let result = {};
		before(async () => {
			result = await linkModule.getLinkData({
				sanitizedLink:
					"http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html",
				link: "http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html",
			});
		});
		it("should resolve a basic URL's metadata", async function () {
			// console.log("LinkData ", result);
			result.status.should.equal(200);
			result.metadata.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.metadata.author.should.equal("Aram Zucker-Scharff");
			result.metadata.description.should.equal(
				"Here's how to make Jekyll posts easier for others to see and share on social networks."
			);
			result.metadata.canonical.should.equal(
				"http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html"
			);
			result.canonical.should.equal(
				"http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html"
			);
			expect(result.metadata.keywords).to.have.members([
				"jekyll",
				"social-media",
			]);
			result.opengraph.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.opengraph.locale.should.equal("en_US");
			result.opengraph.description.should.equal(
				"Here's how to make Jekyll posts easier for others to see and share on social networks."
			);
			result.opengraph.url.should.equal(
				"http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html"
			);
			result.twitter.card.should.equal("summary_large_image");
			result.twitter.creator.should.equal("@chronotope");
			result.twitter.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.twitter.image.should.equal(
				"https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/tumblr_nwncf1T2ht1rl195mo1_1280.jpg"
			);
			Object.keys(result.dublinCore).length.should.equal(0);
			result.jsonLd["@type"].should.equal("BlogPosting");
			result.jsonLd.headline.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.jsonLd.description.should.equal(
				"Here's how to make Jekyll posts easier for others to see and share on social networks."
			);
			expect(result.jsonLd.image).to.have.members([
				"https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/tumblr_nwncf1T2ht1rl195mo1_1280.jpg",
			]);
			expect(result.jsonLd.image).to.have.members([
				"https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/tumblr_nwncf1T2ht1rl195mo1_1280.jpg",
			]);
			result.readabilityObject.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.readabilityObject.byline.should.equal("Aram Zucker-Scharff");
			expect(result.readabilityObject.content).to.have.lengthOf.above(
				100
			);
		});
		it("should sort metadata into a finalized form for archiving", function () {
			// console.dir(result);
			result.finalizedMeta.title.should.equal(
				"How to make your Jekyll site show up on social"
			);
			result.finalizedMeta.creator.should.equal("Aram Zucker-Scharff");
			result.finalizedMeta.description.should.equal(
				"Here's how to make Jekyll posts easier for others to see and share on social networks."
			);
			result.finalizedMeta.date.should.not.equal(false);
			result.finalizedMeta.date.should.not.equal("");
			expect(result.finalizedMeta.topics).to.have.members([
				"jekyll",
				"social-media",
				"Code",
			]);
			Object.keys(result.finalizedMeta).forEach((key) => {
				console.log(result.finalizedMeta, result.finalizedMeta[key]);
				(!result.finalizedMeta[key]).should.not.equal(true);
			});
		});
	});
});
