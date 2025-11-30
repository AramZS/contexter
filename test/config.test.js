var chai = require("chai"),
	expect = chai.expect,
	should = chai.should();

const { config, getConfigProp, setConfig } = require("../src/config");

describe("The Config Module", function () {
	beforeEach(function () {
		// Reset config to defaults before each test
		setConfig({ timeout: 35000 });
	});

	describe("getConfigProp", function () {
		it("should return default timeout value", function () {
			getConfigProp("timeout").should.equal(35000);
		});

		it("should return undefined for non-existent property", function () {
			expect(getConfigProp("nonexistent")).to.be.undefined;
		});
	});

	describe("setConfig", function () {
		it("should update timeout value", function () {
			setConfig({ timeout: 50000 });
			getConfigProp("timeout").should.equal(50000);
		});

		it("should merge with existing config", function () {
			setConfig({ newProp: "test" });
			getConfigProp("timeout").should.equal(35000);
			getConfigProp("newProp").should.equal("test");
		});

		it("should handle multiple property updates", function () {
			setConfig({ timeout: 60000, retries: 3 });
			getConfigProp("timeout").should.equal(60000);
			getConfigProp("retries").should.equal(3);
		});
	});
});
