// config.js
let config = {
	timeout: 35000, // Default timeout value
};

function getConfigProp(prop) {
	return config[prop];
}

function setConfig(newConfig) {
	config = { ...config, ...newConfig };
}

module.exports = {
	setConfig,
	getConfigProp,
	config,
};
