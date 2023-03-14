var chai = require("chai"),
	expect = chai.expect,
	assert = chai.assert,
	eventually = require("chai-as-promised"),
	should = chai.should();

require("dotenv").config();

const linkModule = require("../src/link-archiver");

describe("The Link Archiver Module", function () {
	it("should archive a basic URL", function () {
		this.timeout(90000);
		it.skip("should send a URL to archive.is", async function () {
			const result = await linkModule.pushToArchiveIs(
				"https://blog.aramzs.me"
			);
			result.shortUrl.should.equal("");
		});
		it("should send a URL to archive.org", async function () {
			const result = await linkModule.pushToWayback(
				"https://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html"
			);
			console.dir(result);
			expect(/https:\/\/web\.archive\.org\/web\//.test(result)).to.equal(
				true
			);
		});
		it("should send a URL to robust links", async function () {
			const result = await linkModule.pushToRobustLinks(
				"https://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html"
			);
			console.dir(result);
			expect(result).to.have.property("anchor_text");
			expect(result.anchor_text).to.equal("Context Archive Link");
			expect(result).to.have.property("data-versionurl");
			expect(
				/https:\/\/.*archive/.test(result["data-versionurl"])
			).to.equal(true);
		});
	});
});
