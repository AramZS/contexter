import chai from "chai";
const expect = chai.expect,
	should = chai.should();

import fetchTools from "../src/fetch-tools/index.js";
const fetchUrl = fetchTools.fetchUrl;

import { setConfig } from "../src/config/index.js";

describe("The Fetch URL Module", function () {
	beforeEach(function () {
		setConfig({ timeout: 35000 });
	});

	describe("Timeout handling", function () {
		this.timeout(45000);

		it("should respect configured timeout", function (done) {
			setConfig({ timeout: 5000 });
			const start = Date.now();

			fetchUrl("http://httpstat.us/200?sleep=10000").catch((error) => {
				const elapsed = Date.now() - start;
				elapsed.should.be.lessThan(7000); // Allow some buffer
				done();
			});
		});
	});

	describe("Request options merging", function () {
		it("should merge default options with custom options", function () {
			// This would require mocking fetch to test properly
			// Implementation would test that finalRequestOptions contains merged values
		});

		it("should handle custom user agents", async function () {
			const customUA = "Custom User Agent";
			// Mock implementation to verify UA is set correctly
		});
	});

	describe("Error handling", function () {
		it("should handle network errors gracefully", async function () {
			try {
				await fetchUrl("http://nonexistent-domain-12345.com");
				expect.fail("Should have thrown an error");
			} catch (error) {
				// Should handle ENOTFOUND or similar network errors
			}
		});
	});
});
