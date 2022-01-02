var chai = require("chai"),
	expect = chai.expect,
	assert = chai.assert,
	should = chai.should();

const linkModule = require("../src/link-sanitizer");
describe("The Link Sanitization Module", function () {
	// Basic, let's make sure everything is working
	// Some adapted from https://github.com/braintree/sanitize-url/blob/main/src/__tests__/test.ts
	describe("Link formatter", function () {
		it("should assure that it has a double forward slash and a secure protocol", function () {
			linkModule("www.example.me").should.equal("https://www.example.me");
			linkModule("//aramzs.me").should.equal("https://aramzs.me");
			linkModule("/aramzs.me").should.equal("https://aramzs.me");
			linkModule(
				"hacktext.com/2018/03/users-humans-and-eyeballs-designing-for-news-readers-2319/"
			).should.equal(
				"https://hacktext.com/2018/03/users-humans-and-eyeballs-designing-for-news-readers-2319/"
			);
		});
		it("does strip irrelevant unicode characters", () => {
			expect(linkModule("www.example.com/лот.рфшишкиü–")).to.equal(
				"https://www.example.com/."
			);
		});
		it("should assure that valid links remain valid", function () {
			linkModule("http://example.com/path/to:something").should.equal(
				"http://example.com/path/to:something"
			);
			expect(
				linkModule("http://example.com:4567/path/to:something")
			).to.equal("http://example.com:4567/path/to:something");
			expect(
				linkModule("https://example.com:4567/path/to:something")
			).to.equal("https://example.com:4567/path/to:something");
		});
		it("strips out ctrl chars", () => {
			expect(
				linkModule(
					"www.example.com/\u200D\u0000\u001F\x00\x1F\uFEFFfoo"
				)
			).to.equal("https://www.example.com/foo");
		});
	});
	describe("Broken Links checker", function () {
		it("should throw on mailto links", () => {
			expect(() => {
				linkModule("mailto:test@example.com?subject=hello+world");
			}).to.throw("Invalid Mailto Link");
		});
		it("should throw on blank links", () => {
			expect(() => linkModule("")).to.throw("Blank Link");
		});
	});
	describe("Marketing Cruft remover", function () {
		it("should remove utm params", () => {
			linkModule(
				"http://example.com/path/to?utm_content=buyme"
			).should.equal("http://example.com/path/to");
			linkModule(
				"http://example.com/path/to?utm_content=buyme&utm_medium=twitter"
			).should.equal("http://example.com/path/to");
		});
		it("should remove mailchimp params", () => {
			linkModule("http://example.com/path/to?mc_eid=buyme").should.equal(
				"http://example.com/path/to"
			);
		});
	});
});
