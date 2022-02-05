const hash = require("crypto").createHash;

module.exports = (url) => {
	const hashConfig = { alg: "sha1", digest: "hex" };
	return hash(hashConfig.alg).update(url).digest(hashConfig.digest);
};
