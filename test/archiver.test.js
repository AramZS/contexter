var chai = require("chai"),
	expect = chai.expect,
	assert = chai.assert,
	eventually = require("chai-as-promised"),
	should = chai.should();

require("dotenv").config();

const linkModule = require("../src/link-archiver");

describe("The Link Archiver Module", function () {
	describe("should archive a basic URL", function () {
		this.timeout(5000);
		it.skip("should send a URL to archive.is", async function () {
			const result = await linkModule.pushToArchiveIs(
				"https://blog.aramzs.me"
			);
			result.shortUrl.should.equal("");
		});
	});
});
