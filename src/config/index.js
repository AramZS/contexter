// config.js
export let config = {
	timeout: 35000, // Default timeout value
};

export function getConfigProp(prop) {
	return config[prop];
}

export function setConfig(newConfig) {
	config = { ...config, ...newConfig };
}
