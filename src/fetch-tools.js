const AbortController = require("abort-controller");
// Using suggestion from the docs - https://www.npmjs.com/package/node-fetch#loading-and-configuring-the-module
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const ua =
	"facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";

const selectUserAgent = (link, shuffleExclude = false) => {
	let userAgent = ua;
	// https://developers.whatismybrowser.com/useragents/explore/software_type_specific/?utm_source=whatismybrowsercom&utm_medium=internal&utm_campaign=breadcrumbs
	// https://user-agents.net/lookup
	const userAgents = {
		windows:
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
			"AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 " +
			"Safari/537.36",
		osx14: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36 OPR/72.0.3815.400",
		firefox:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:83.0) Gecko/20100101 Firefox/83.0",
		firefox99:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0",
		osx11: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9",
		baidu_ua: "Baiduspider+(+http://www.baidu.com/search/spider.htm)",
		googlebot: "Googlebot/2.1 (+http://www.google.com/bot.html)",
		modernGooglebot:
			"UCWEB/2.0 (compatible; Googlebot/2.1; +google.com/bot.html)",
		pythonRequests: "python-requests/2.23.0",
		facebookRequests:
			"facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
		lighthouse:
			"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko; Google Page Speed Insights) Chrome/41.0.2272.118 Safari/537.36",
		osx15: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0",
		linux: "Mozilla/5.0 (X11; Linux x86_64)",
		mobileBrave:
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.38 Safari/537.36 Brave/75",
		feedReader:
			"Feedspot/1.0 (+https://www.feedspot.com/fs/fetcher; like FeedFetcher-Google)",
	};
	const substackERx = RegExp("email.substack");
	const substackMGRx = RegExp("mg2.substack");
	const washPostRx = RegExp("s2.washingtonpost.com");
	const washPostStandardRx = RegExp("washingtonpost.com");
	const archiveOrg = RegExp("archive.org");
	const bbergLink = /link\.mail\.bloombergbusiness\.com/;
	const bberg = /bloomberg/;
	const goLink = /r\.g-omedia\.com/;
	const logicLink = /thelogic\.us12\.list-manage\.com/;

	if (substackMGRx.test(link) || substackERx.test(link)) {
		userAgent = userAgents.baidu_ua;
	} else if (washPostRx.test(link)) {
		userAgent = userAgents.lighthouse;
	} else if (washPostStandardRx.test(link)) {
		userAgent = userAgents.lighthouse;
	} else if (bbergLink.test(link) || goLink.test(link) || bberg.test(link)) {
		userAgent = userAgents.osx11;
	} else if (logicLink.test(link) || archiveOrg.test(link)) {
		userAgent = userAgents.firefox;
	} else {
		const keys = Object.keys(userAgents);
		if (shuffleExclude) {
			const values = Object.values(userAgents);
			var index = values.indexOf(shuffleExclude);
			if (index > -1) {
				keys.splice(index, 1);
			}
		}
		userAgent = userAgents[keys[Math.floor(Math.random() * keys.length)]];
	}
	return userAgent;
};

const getRequestHeaders = () => {
	return {
		cookie: "usprivacy=1YYY",
		Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"User-Agent": ua,
		"Accept-Encoding": "gzip, deflate", // 'Accept-Encoding': 'gzip, deflate, br',
		"Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8", // 'Accept-Language': 'en-US,en;q=0.9',
		Dnt: "1",
		"Sec-GPC": "1",
		"Upgrade-Insecure-Requests": "1",
		Referer: "https://www.gmail.com/",
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
		console.log(response.internals);
		throw new HTTPResponseError(response);
	}
};

const fetchUrl = async (
	url,
	options = false,
	userAgent = true,
	userAgentExclude = false,
	retryCount = 0
) => {
	let response = false;
	await timeout(2000);
	let finalOptions = options
		? options
		: {
				method: "GET",
				redirect: "follow",
				compress: true,
		  };
	const controller = new AbortController();
	const fetchTimeout = setTimeout(() => {
		console.log("Request timed out for", link, userAgent);
		if (linkObj.source.length < 3) {
			linkObj.source = link;
			linkObj.title =
				"Request Timed Out for: " + link + " with " + userAgent;
		}
		controller.abort();
	}, 6000);
	finalOptions.headers = getRequestHeaders();
	if (userAgent) {
		finalOptions.headers["User-Agent"] =
			userAgent === true
				? selectUserAgent(url, userAgentExclude)
				: userAgent;
	}
	finalOptions.signal = controller.signal;
	try {
		response = await fetch(url, finalOptions);
	} catch (e) {
		// URL does not exist or has an issue that does not constitute a reason to re-request
		if (e.hasOwnProperty("response")) {
			console.error("Fetch Error in response", e.response.text());
		} else if (e.code == "ENOTFOUND") {
			console.error("URL Does Not Exist", e);
		}
		clearTimeout(fetchTimeout);
		return false;
	}
	if (retryCount < 3) {
		try {
			response = checkStatus(response);
			clearTimeout(fetchTimeout);
			return response;
		} catch (e) {
			clearTimeout(fetchTimeout);

			// Add a random additional wait before triggering a rescrape.
			var retryTime = Math.floor(
				Math.random() * (2000 - 1000 + 1) + 1000
			);
			await timeout(retryTime * retryCount);
			const fetchRetry = await fetchUrl(
				url,
				false,
				true,
				finalOptions.headers["User-Agent"],
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

module.exports = fetchUrl;
