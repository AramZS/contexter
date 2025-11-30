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

	// Add these tests to existing sanitizer.test.js

	describe("Marketing Parameter Stripping", function () {
		it("should strip UTM parameters", function () {
			linkModule(
				"https://example.com?utm_source=test&utm_medium=email"
			).should.equal("https://example.com");
			linkModule(
				"https://example.com?param=value&utm_campaign=test"
			).should.equal("https://example.com?param=value");
		});

		it("should strip MailChimp parameters", function () {
			linkModule(
				"https://example.com?mc_cid=123&mc_eid=456"
			).should.equal("https://example.com");
		});

		it("should strip YouTube tracking parameters", function () {
			linkModule(
				"https://www.youtube.com/watch?v=abc123&feature=share&app=desktop"
			).should.equal("https://www.youtube.com/watch?v=abc123");
		});

		it("should strip HubSpot parameters", function () {
			linkModule(
				"https://example.com?_hsenc=test&_hsmi=123"
			).should.equal("https://example.com");
		});

		it("should preserve important parameters while stripping tracking", function () {
			linkModule(
				"https://example.com?id=123&utm_source=test&page=2"
			).should.equal("https://example.com?id=123&page=2");
		});
	});

	describe("Edge Cases", function () {
		it("should handle URLs with fragments", function () {
			linkModule("example.com#section").should.equal(
				"https://example.com#section"
			);
		});

		it("should handle URLs with unusual ports", function () {
			linkModule("example.com:8080/path").should.equal(
				"https://example.com:8080/path"
			);
		});

		it("should handle internationalized domain names", function () {
			// Test handling of IDN domains
			const result = linkModule("münchen.de");
			result.should.include("https://");
		});
	});
});
