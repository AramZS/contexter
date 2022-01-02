var chai = require("chai"),
	expect = chai.expect,
	assert = chai.assert;
should = chai.should();
describe("Array", function () {
	// Basic, let's make sure everything is working
	describe("#indexOf()", function () {
		it("should return -1 when the value is not present", function () {
			[1, 2, 3].indexOf(4).should.equal(-1);
		});
	});
});
