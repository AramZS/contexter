import chai from "chai";
const expect = chai.expect,
	should = chai.should();

import fetchTools from "../src/fetch-tools/index.js";

describe("The Fetch Tools Module", function () {
	describe("User Agent Selection", function () {
		it("should return Baidu UA for Substack links", function () {
			const ua = fetchTools.selectUserAgent(
				"https://email.substack.com/test"
			);
			ua.should.equal(
				"Baiduspider+(+http://www.baidu.com/search/spider.htm)"
			);
		});

		it("should return Lighthouse UA for Washington Post links", function () {
			const ua = fetchTools.selectUserAgent(
				"https://s2.washingtonpost.com/test"
			);
			ua.should.include("Google Page Speed Insights");
		});

		it("should return Firefox UA for Archive.org links", function () {
			const ua = fetchTools.selectUserAgent("https://archive.org/test");
			ua.should.include("Firefox");
		});

		it("should return random UA for generic links", function () {
			const ua = fetchTools.selectUserAgent("https://example.com");
			ua.should.be.a("string");
			ua.length.should.be.greaterThan(0);
		});

		it("should exclude specified user agent when shuffling", function () {
			const excludeUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
			const ua = fetchTools.selectUserAgent("https://example.com", [
				excludeUA,
			]);
			ua.should.not.equal(excludeUA);
		});
	});

	describe("Request Headers", function () {
		it("should return proper headers object", function () {
			const headers = fetchTools.getRequestHeaders(
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
			);
			headers.should.have.property("cookie");
			headers.should.have.property("Accept");
			headers.should.have.property("User-Agent");
			headers.should.have.property("Accept-Encoding");
			headers.should.have.property("Accept-Language");
			headers.should.have.property("Dnt", "1");
			headers.should.have.property("Sec-GPC", "1");
		});

		it("should include privacy-focused headers", function () {
			const headers = fetchTools.getRequestHeaders(
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
			);
			headers.cookie.should.equal("usprivacy=1YYY");
			headers.Dnt.should.equal("1");
			headers["Sec-GPC"].should.equal("1");
		});
	});
});
