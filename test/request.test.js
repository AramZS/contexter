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
		it("should retrieve oembed from a Facebook URL", async function () {
			const result = await linkModule.fetchOEmbed(
				"https://www.facebook.com/photo/?fbid=10104856317308137&set=pob.15609421"
			);
			console.log("Facebook Result", result);
			const htmlResponse = result.html;
			result.should.equal(
				'<a data-flickr-embed="true" href="https://www.flickr.com/photos/aramzs/33763840540/" title="upload by AramZS, on Flickr"><img src="https://live.staticflickr.com/2941/33763840540_481ce97db2_z.jpg" width="640" height="640" alt="upload"></a><script async src="https://embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>'
			);
		});
	});
});
