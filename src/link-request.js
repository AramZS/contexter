// Using suggestion from the docs - https://www.npmjs.com/package/node-fetch#loading-and-configuring-the-module

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { hasProvider, extract } = require("oembed-parser");

const ua =
	"facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";

const getRequestHeaders = () => {
	return {
		cookie: "",
		"Accept-Language": "en-US,en;q=0.8",
		"User-Agent": ua,
	};
};

class HTTPResponseError extends Error {
	constructor(response, ...args) {
		super(
			`HTTP Error Response: ${response.status} ${response.statusText}`,
			...args
		);
		this.response = response;
	}
}

const checkStatus = (response) => {
	if (response.ok) {
		// response.status >= 200 && response.status < 300
		return response;
	} else {
		throw new HTTPResponseError(response);
	}
};

const fetchUrl = async (url) => {
	let response = false;
	try {
		response = await fetch(url, {
			method: "get",
			header: getRequestHeaders(),
		});
	} catch (e) {
		console.error("Fetch Error", e.response.text());
	}
	checkStatus(response);
	return response;
};

const fetchOEmbed = async (url, fbAppID, fbClientToken) => {
	const oembedData = false;
	if (!process.env.hasOwnProperty("FACEBOOK_APP_ID") && fbAppID) {
		process.env.FACEBOOK_APP_ID = fbAppID;
	}
	if (!process.env.hasOwnProperty("FACEBOOK_CLIENT_TOKEN") && fbClientToken) {
		process.env.FACEBOOK_CLIENT_TOKEN = fbClientToken;
	}
	if (hasProvider(url)) {
		return await extract(url);
	} else {
		return oembedData;
	}
};

const getLinkData = async (link) => {
	return await fetchUrl(link);
};

module.exports = {
	getLinkData,
	fetchOEmbed,
	fetchUrl,
	getRequestHeaders,
};
