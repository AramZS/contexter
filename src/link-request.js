// Using suggestion from the docs - https://www.npmjs.com/package/node-fetch#loading-and-configuring-the-module

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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
		if (e.hasOwnProperty("response")) {
			console.error("Fetch Error in response", e.response.text());
		} else if (e.code == "ENOTFOUND") {
			console.error("URL Does Not Exist", e);
		}
		return false;
	}
	response = checkStatus(response);
	return response;
};

const fetchOEmbed = async (url) => {
	const oembedData = false;
	if (hasProvider(url) && !url.startsWith("https://www.facebook.com")) {
		return await extract(url);
	} else {
		return oembedData;
	}
};

const pullMetadataFromRDFProperty = (documentObj, topNode, propType) => {
	const graphNodes = documentObj.querySelectorAll(
		`meta[${propType}^='${topNode}']`
	);
	const openGraphObject = Array.from(graphNodes).reduce((prev, curr) => {
		const keyValue = curr.attributes
			.item(0)
			.nodeValue.replace(`${topNode}`, "");
		if (prev.hasOwnProperty(keyValue)) {
			const lastValue = prev[keyValue];
			if (Array.isArray(lastValue)) {
				prev[keyValue].push(curr.content);
			} else {
				prev[keyValue] = [lastValue, curr.content];
			}
		} else {
			prev[keyValue] = curr.content;
		}
		return prev;
	}, {});
	// console.log("openGraphObject", openGraphObject);
	return openGraphObject;
};

const processMetadata = (DOMWindowObject) => {
	const metaInfo = DOMWindowObject.document.getElementsByTagName("meta");
	const openGraphObject = pullMetadataFromRDFProperty(
		DOMWindowObject.document,
		"og:",
		"property"
	);
	let openGraphTypeObject = {};
	if (openGraphObject.type !== false) {
		openGraphTypeObject = pullMetadataFromRDFProperty(
			DOMWindowObject.document,
			openGraphObject.type + ":",
			"property"
		);
	}
	const twitterGraphObject = pullMetadataFromRDFProperty(
		DOMWindowObject.document,
		"twitter:",
		"name"
	);
	const dublinCoreGraphObject = pullMetadataFromRDFProperty(
		DOMWindowObject.document,
		"DC.",
		"name"
	);
	// console.log("Twitter Object", twitterGraphObject);
	const headMetadata = {
		metadata: {
			author: metaInfo.author ? metaInfo.author.content : false,
			title: DOMWindowObject.document.querySelector("title").text,
			description: metaInfo.description
				? metaInfo.description.content
				: false,
			canonical: DOMWindowObject.document.querySelector(
				"link[rel='canonical']"
			).href,
			keywords: metaInfo.keywords
				? [
						...metaInfo.keywords.content
							.split(",")
							.map((value) => value.trim()),
				  ]
				: [],
		},
		dublinCore: {}, // https://en.wikipedia.org/wiki/Dublin_Core#DCMI_Metadata_Terms
		opengraph: {
			title: false,
			description: false,
			url: false,
			site_name: false,
			locale: false,
			type: false,
			typeObject: {
				published_time: false,
				modified_time: false,
				author: false,
				publisher: false,
				section: false,
				tag: [],
			},
			image: false,
		},
		twitter: {
			site: false,
			description: false,
			card: false,
			creator: false,
			title: false,
			image: false,
		},
	};
	Object.assign(headMetadata.opengraph, openGraphObject);
	if (openGraphObject.type !== false) {
		Object.assign(headMetadata.opengraph.typeObject, openGraphTypeObject);
	}
	Object.assign(headMetadata.twitter, twitterGraphObject);
	Object.assign(headMetadata.dublinCore, dublinCoreGraphObject);
	return headMetadata;
};

const assignPrimaryProperties = (metadataLinkObj) => {
	const finalizedMeta = {
		title: "",
		description: "",
		creator: "",
		publisher: "",
		date: "",
		subject: "",
		topics: [],
	};
	let topicsSet = new Set();
	let objectProps = [
		'metadata',
		'twitter',
		'opengraph',
		'jsonLd'
	]
	Object.keys(finalizedMeta).forEach((key) => {
		if (key == "topics"){
			if (Array.isArray(metadataLinkObj[prop][key])){
				objectProps.forEach((prop) => {
					metadataLinkObj[prop][key].forEach((v) => {
						topicsSet.add(v)
					})
				})
			}
		} else {
			if (metadataLinkObj.metadata[key]) {
				finalizedMeta[key] = metadataLinkObj.metadata[key];
			}
			if (metadataLinkObj.twitter[key]) {
				finalizedMeta[key] = metadataLinkObj.twitter[key];
			}
			if (metadataLinkObj.opengraph[key]) {
				finalizedMeta[key] = metadataLinkObj.opengraph[key];
			}
			if (metadataLinkObj.jsonLd[key]) {
				finalizedMeta[key] = metadataLinkObj.jsonLd[key];
			}
		}
	})
};

const jsonData = (DOMWindowObject) => {
	const jsonDataTag = DOMWindowObject.document.querySelector(
		'script[type="application/ld+json"]'
	);
	if (!jsonDataTag) {
		return false;
	}
	if (!jsonDataTag.textContent) {
		return false;
	}
	return JSON.parse(jsonDataTag.textContent);
};

const getLinkData = async (
	linkObj = {
		link: "",
		sanitizedLink: "",
	}
) => {
	const personObject = {
		"@type": false,
		name: false,
		description: false,
		sameAs: false,
		image: {
			"@type": false,
			url: false,
		},
		givenName: false,
		familyName: false,
		alternateName: false,
		publishingPrinciples: false,
	};
	const linkDataObj = {
		originalLink: linkObj.link,
		sanitizedLink: linkObj.sanitizedLink,
		htmlText: "",
		oembed: false,
		finalizedMeta: {},
		jsonLd: {
			"@type": false,
			headline: false,
			description: false,
			image: [],
			mainEntityOfPage: {
				"@type": false,
				"@id": false,
			},
			datePublished: false,
			dateModified: false,
			isAccessibleForFree: false,
			isPartOf: {
				"@type": [],
				name: false,
				productID: false,
			},
			discussionUrl: false,
			license: false,
			author: personObject,
			publisher: {
				"@type": false,
				name: false,
				description: false,
				sameAs: false,
				logo: {
					"@type": false,
					url: false,
				},
				publishingPrinciples: false,
			},
			editor: personObject,
		},
	};
	const response = await fetchUrl(linkObj.sanitizedLink);
	if (response) {
		linkDataObj.status = response.status;
		const responseText = await response.text();
		linkDataObj.htmlText = responseText;
		linkDataObj.oembed = await fetchOEmbed(linkObj.sanitizedLink);
		const jsDom = new JSDOM(responseText);
		const DOMWindowObject = jsDom.window;
		// Meta name
		Object.assign(linkDataObj, processMetadata(DOMWindowObject));
		// JSON LD
		Object.assign(linkDataObj.jsonLd, jsonData(DOMWindowObject));
		linkDataObj.jsonLd.title = linkDataObj.jsonLd.headline;
		if (linkDataObj.jsonLd.keywords){
			if (Array.isArray(linkDataObj.jsonLd.keywords)){
				linkDataObj.topics = linkDataObj.jsonLd.keywords
			} else {
				linkDataObj.topics = [
					...linkDataObj.jsonLd.keywords
						.split(",")
						.map((value) => value.trim()),
			  	]
			}

		}
		//console.log("linkDataObj");
		//console.dir(linkDataObj, { depth: null });
		Object.assign(
			linkDataObj.finalizedMeta,
			assignPrimaryProperties(linkDataObj)
		);
		return linkDataObj;
	} else {
		return false;
	}
};

module.exports = {
	getLinkData,
	processMetadata,
	fetchOEmbed,
	jsonData,
	fetchUrl,
	getRequestHeaders,
};
