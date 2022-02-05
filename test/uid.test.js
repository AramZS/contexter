var chai = require("chai"),
	expect = chai.expect,
	assert = chai.assert,
	eventually = require("chai-as-promised"),
	should = chai.should();

const linkModule = require("../src/link-uid");

describe("The Link UID Module", function () {
	describe("should generate a UID", function () {
		it("should create a UID", function () {
			const result = linkModule("https://blog.aramzs.me");
			result.should.be.a("string");
		});
		it("should create a repeatable UID", function () {
			const result = linkModule(
				"https://twitter.com/Chronotope/status/1485620069229027329"
			);
			result.should.be.a("string");
			const resultTwo = linkModule(
				"http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html"
			);
			const resultThree = linkModule(
				"https://twitter.com/Chronotope/status/1485620069229027329"
			);
			const resultFour = linkModule(
				"http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html"
			);
			expect(result).to.equal(resultThree);
			console.dir(result);
			expect(result).to.not.equal(resultTwo);
			expect(result).to.not.equal(resultFour);
			expect(resultTwo).to.equal(resultFour);
			console.dir(resultTwo);
			expect(resultTwo).to.not.equal(resultThree);
		});
	});
});
