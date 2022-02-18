var sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl;

//https://stackoverflow.com/questions/205923/best-way-to-handle-security-and-avoid-xss-with-user-entered-urls
// https://core.trac.wordpress.org/browser/tags/3.5.1/wp-includes/formatting.php#L2561
const regexClean = (link) => {
	// return Regex.Replace(url, /[^-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]/gim, "");
	// [^a-z0-9-~+_.?#=!&;,/:%@$\|*\'()\\x80-\\xff]
	return link.replace(/[^a-z0-9-~+_.?#=!&;,\/:%@$\|*\'()\\x80-\\xff]/gim, "");
};

const stripMarketingParams = (url) => {
	// Strip UTM parameters
	if (url.indexOf("utm_") > url.indexOf("?")) {
		url = url.replace(
			/([\?\&]utm_(reader|source|medium|campaign|content|term|cid)=[^&#]*)/gi,
			""
		);
	}

	// Strip MailChimp parameters
	if (
		url.indexOf("mc_eid") > url.indexOf("?") ||
		url.indexOf("mc_cid") > url.indexOf("?")
	) {
		url = url.replace(/([\?\&](mc_cid|mc_eid)=[^&#]+)/gi, "");
	}

	// Strip YouTube parameters
	if (
		url.indexOf("http://www.youtube.com/watch") == 0 ||
		url.indexOf("https://www.youtube.com/watch") == 0
	) {
		url = url.replace(
			/([\?\&](feature|app|ac|src_vid|annotation_id)=[^&#]*)/gi,
			""
		);
	}

	// Strip Yandex openstat parameters
	if (url.indexOf("_openstat") > url.indexOf("?")) {
		url = url.replace(/([\?\&]_openstat=[^&#]+)/gi, "");
	}

	// Strip HubSpot parameters
	if (
		url.indexOf("_hsenc") > url.indexOf("?") ||
		url.indexOf("_hsmi") > url.indexOf("?")
	) {
		url = url.replace(/([\?\&](_hsenc|_hsmi)=[^&#]+)/gi, "");
	}

	// If there were other query parameters, and the stripped ones were first,
	// then we need to convert the first ampersand to a ? to still have a valid
	// URL.
	if (url.indexOf("&") != -1 && url.indexOf("?") == -1) {
		url = url.replace("&", "?");
	}

	return url;
};

module.exports = (link) => {
	let cleanLink = "";
	cleanLink = regexClean(link);
	cleanLink = sanitizeUrl(cleanLink);
	if (/^mailto/.test(cleanLink)) {
		throw new Error("Invalid Mailto Link");
	}
	if (/about:blank/.test(cleanLink)) {
		throw new Error("Blank Link");
	}
	// Check for links with no `// and no http:`
	if (
		!/^\/\//.test(cleanLink) &&
		!/^http/.test(cleanLink) &&
		!/^\//.test(cleanLink)
	) {
		cleanLink = "//" + cleanLink;
	} else if (/^\//.test(cleanLink) && !/^\/\//.test(cleanLink)) {
		cleanLink = "/" + cleanLink;
	}
	if (!/^http/.test(cleanLink)) {
		cleanLink = "https:" + cleanLink;
	}
	cleanLink = stripMarketingParams(cleanLink);
	try {
		let linkObj = new URL(cleanLink);
	} catch (e) {
		throw new Error("Invalid link");
	}
	return cleanLink.trim();
};
