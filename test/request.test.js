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
		const result = await linkModule.fetchUrl(
			"https://apiz.githubz.comzs/repos/AramZS/devblog/git/refs/heads/main"
		);
		result.should.be.false;
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
		const htmlPage = require("./htmlPageSample");
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
			expect(result.metadata.keyvalues).to.have.members([
				"jekyll",
				"social-media",
			]);
		});
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
			expect(result.metadata.keyvalues).to.have.members([
				"jekyll",
				"social-media",
			]);
		});
		it("should retrieve opengraph data from an HTML document", async function () {
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
		});
		it("should retrieve opengraph type data from an HTML document", async function () {
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
	});
});
