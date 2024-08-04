import fetch from "node-fetch";
import AbortController from "abort-controller";
import getRequestHeaders from "./getRequestHeaders";
import selectUserAgent from "./selectUserAgent";
import { getConfigProp } from "../config";

function timeoutCounter(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

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
		console.log("Contexter Fetch status is not OK", response.internals);
		throw new HTTPResponseError(response);
	}
};

const checkFailedResponse = (e, fetchTimeout) => {
	// URL does not exist or has an issue that does not constitute a reason to re-request
	if (e.hasOwnProperty("response")) {
		console.error("Fetch Error in response", e.response.text());
	} else if (e.code == "ENOTFOUND") {
		console.error("URL Does Not Exist", e);
	}
	clearTimeout(fetchTimeout);
	return false;
};

const getRandomDelay = (delay) => {
	return Math.floor(Math.random() * (delay - 1000 + 1) + 1000);
};

export default fetchUrl = async (
	url,
	fetchOptions = {
		userAgent: true,
		userAgentExclude: false,
		retryCount: 0,
		timeout: 35000,
		delay: 2000,
	},
	requestOptions = {
		method: "GET",
		redirect: "follow",
		compress: true,
	}
) => {
	let response = false;
	await timeoutCounter(delay);
	let defaultRequestOptions = {
		method: "GET",
		redirect: "follow",
		compress: true,
	};
	let finalRequestOptions = {
		...defaultRequestOptions,
		...requestOptions,
	};
	let defaultFetchOptions = {
		userAgent: true,
		userAgentExclude: false,
		retryCount: 0,
		timeout: 35000,
		delay: 2000,
	};
	let finalFetchOptions = {
		...defaultFetchOptions,
		...fetchOptions,
	};
	let { userAgent, userAgentExclude, retryCount, delay } = finalFetchOptions;
	const timeout = getConfigProp("timeout");
	if (delay < 2000) {
		throw new Error("Timeout must be at least 2000ms");
	}
	const controller = new AbortController();
	const fetchTimeout = setTimeout(() => {
		console.log("Request timed out for", url, userAgent);
		controller.abort();
	}, timeout);

	finalRequestOptions.headers = getRequestHeaders();
	if (userAgent) {
		finalRequestOptions.headers["User-Agent"] =
			userAgent === true
				? selectUserAgent(url, [userAgentExclude])
				: userAgent;
	}
	finalRequestOptions.signal = controller.signal;
	try {
		response = await fetch(url, finalRequestOptions);
	} catch (e) {
		return checkFailedResponse(e, fetchTimeout);
	}
	if (retryCount < 3) {
		try {
			console.log("Retry occurring for time:", retryCount);
			response = checkStatus(response);
			clearTimeout(fetchTimeout);
			return response;
		} catch (e) {
			clearTimeout(fetchTimeout);

			// Add a random additional wait before triggering a rescrape.
			var retryTime = getRandomDelay();
			await timeout(retryTime * retryCount);
			const fetchRetry = await fetchUrl(
				url,
				false,
				true,
				selectUserAgent(false, [
					userAgentExclude,
					finalRequestOptions.headers["User-Agent"],
				]),
				retryCount + 1
			);
			return fetchRetry;
		}
	} else {
		response = checkStatus(response);
		clearTimeout(fetchTimeout);
		return response;
	}
};
