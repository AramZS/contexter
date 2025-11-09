var chai = require("chai"),
	expect = chai.expect,
	should = chai.should();

const { context } = require("../src/index");
// None of this works yet. I need to finish moving all the functions over.
describe.skip("Integration Tests", function () {
	describe("Full workflow", function () {
		this.timeout(60000);

		it("should handle timeout parameter in main function", async function () {
			const customTimeout = 45000;
			const result = await context(
				"https://example.com",
				false,
				null,
				customTimeout
			);
			// Test that timeout was properly propagated
		});

		it("should handle archive links correctly", async function () {
			const result = await context(
				"https://web.archive.org/web/20210101000000/https://example.com",
				true,
				"https://example.com"
			);

			result.should.have.property("initialLink", "https://example.com");
			result.data.archivedData.link.should.equal(
				"https://web.archive.org/web/20210101000000/https://example.com"
			);
		});

		it("should fail gracefully on invalid URLs", async function () {
			const result = await context("not-a-valid-url");
			result.should.be.false;
		});

		it("should handle network timeouts gracefully", async function () {
			// Test with a URL that will timeout
			const result = await context(
				"http://httpstat.us/200?sleep=50000",
				false,
				null,
				5000
			);
			result.should.be.false;
		});
	});
});
