const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetchUrl = require("./fetch-tools");
const { hasProvider, extract } = require("oembed-parser");
var { Readability } = require("@mozilla/readability");
const twitterTools = require("./tweet-archiver");

const fetchOEmbed = async (url) => {
	const oembedData = false;
	if (hasProvider(url) && !url.startsWith("https://www.facebook.com")) {
		const data = await extract(url);
		if (data) {
			return data;
		} else {
			if (
				(!data && url.startsWith("https://www.twitter.com")) ||
				url.startsWith("https://twitter.com")
			) {
				const response = await fetchUrl(
					`https://publish.twitter.com/oembed?url=${url}`
				);
				const data = await response.json();
				return data;
			} else {
				return false;
			}
		}
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
	const images = DOMWindowObject.document.getElementsByTagName("img");
	const grafs = DOMWindowObject.document.getElementsByTagName("p");
	let leadGraf = "";
	if (grafs && grafs.length >= 1) {
		leadGraf = grafs[0].textContent;
	}
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
			title: DOMWindowObject.document.querySelector("title")
				? DOMWindowObject.document.querySelector("title").text
				: "",
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
			image: images.length ? images[0].src : false,
			firstParagraph: leadGraf,
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
		author: "",
		creator: "",
		publisher: "",
		date: "",
		subject: "",
		image: "",
		// topics: [],
	};
	let topicsSet = new Set();
	Object.keys(finalizedMeta).forEach((key) => {
		if (metadataLinkObj.readabilityObject[key]) {
			finalizedMeta[key] = metadataLinkObj.readabilityObject[key];
		}
		if (metadataLinkObj.metadata[key]) {
			finalizedMeta[key] = metadataLinkObj.metadata[key];
		}
		if (metadataLinkObj.dublinCore[key]) {
			finalizedMeta[key] = metadataLinkObj.dublinCore[key];
		}
		if (metadataLinkObj.twitter[key]) {
			finalizedMeta[key] = metadataLinkObj.twitter[key];
		}
		if (metadataLinkObj.opengraph[key]) {
			finalizedMeta[key] = metadataLinkObj.opengraph[key];
		}
		if (metadataLinkObj.jsonLd[key]) {
			if (key === "image") {
				if (
					metadataLinkObj.jsonLd[key].length &&
					metadataLinkObj.jsonLd[key][0] instanceof String
				) {
					finalizedMeta[key] = metadataLinkObj.jsonLd[key][0];
				} else if (
					metadataLinkObj.jsonLd[key].length &&
					metadataLinkObj.jsonLd[key][0] &&
					typeof metadataLinkObj.jsonLd[key][0] === "object" &&
					metadataLinkObj.jsonLd[key][0].hasOwnProperty("url")
				) {
					finalizedMeta[key] = metadataLinkObj.jsonLd[key][0].url;
				}
			}
			if (key === "author" || key === "publisher" || key === "creator") {
				if (
					metadataLinkObj.jsonLd[key] &&
					metadataLinkObj.jsonLd[key].length &&
					metadataLinkObj.jsonLd[key] instanceof String
				) {
					finalizedMeta[key] = metadataLinkObj.jsonLd[key];
				} else if (
					metadataLinkObj.jsonLd[key] &&
					typeof metadataLinkObj.jsonLd[key] === "object" &&
					metadataLinkObj.jsonLd[key].hasOwnProperty("name")
				) {
					finalizedMeta[key] = metadataLinkObj.jsonLd[key].name;
				}
			} else {
				finalizedMeta[key] = metadataLinkObj.jsonLd[key];
			}
		}
	});
	finalizedMeta.title = metadataLinkObj.jsonLd.headline
		? metadataLinkObj.jsonLd.headline
		: finalizedMeta.title;

	let keywords = [];
	const processTopicsArrayishValue = (keywordsStrings) => {
		let keywordCandidates = [];
		if (keywordsStrings) {
			if (Array.isArray(keywordsStrings)) {
				keywordCandidates = keywordsStrings;
			} else {
				keywordCandidates = [
					...keywordsStrings.split(",").map((value) => value.trim()),
				];
			}
		}
		return keywordCandidates;
	};
	keywords.push(
		...processTopicsArrayishValue(metadataLinkObj.jsonLd.keywords)
	);
	keywords.push(
		...processTopicsArrayishValue(metadataLinkObj.metadata.keywords)
	);
	if (
		metadataLinkObj.opengraph.typeObject &&
		metadataLinkObj.opengraph.typeObject.tag
	) {
		keywords.push(
			...processTopicsArrayishValue(
				metadataLinkObj.opengraph.typeObject.tag
			)
		);
	}
	if (
		metadataLinkObj.opengraph.typeObject &&
		metadataLinkObj.opengraph.typeObject.section
	) {
		keywords.push(metadataLinkObj.opengraph.typeObject.section);
	}
	keywords.forEach((kw) => {
		topicsSet.add(kw);
	});
	finalizedMeta.topics = [...topicsSet];
	if (metadataLinkObj.metadata.author) {
		finalizedMeta.creator = metadataLinkObj.metadata.author;
	}
	if (metadataLinkObj.jsonLd.author && metadataLinkObj.jsonLd.author.name) {
		finalizedMeta.creator = metadataLinkObj.jsonLd.author.name;
	}
	// console.log("finalizedMeta", finalizedMeta);
	return finalizedMeta;
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

const readabilityData = (DOMWindowObject) => {
	let reader = new Readability(DOMWindowObject.document);
	let articleObj = reader.parse();
	return articleObj;
};

const getLinkData = async (
	linkObj = {
		link: "",
		sanitizedLink: "",
	},
	tweetScriptEmbed = true
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
		canonical: linkObj.sanitizedLink,
		htmlText: "",
		oembed: false,
		readabilityObject: {
			title: false,
			content: false,
			textContent: false,
			length: false,
			excerpt: false,
			byline: false,
			dir: false,
			siteName: false,
		}, // https://github.com/mozilla/readability#parse
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
		twitterObj: false,
	};
	// let fetchReadyLink = linkObj.sanitizedLink;

	const response = await fetchUrl(linkObj.sanitizedLink);
	if (response) {
		linkDataObj.status = response.status;
		const responseText = await response.text();
		linkDataObj.htmlText = responseText;
		if (/twitter.com\//.test(linkObj.sanitizedLink)) {
			const oneOrMoreTweets = await twitterTools.getTweets(
				linkObj.sanitizedLink
			);
			// console.log("getTweets");
			// console.dir(oneOrMoreTweets);
			const oembedObjectSeries = oneOrMoreTweets.map(
				async (element, index) => {
					// console.log("Element", element);
					const oembedData = await fetchOEmbed(
						"https://twitter.com/twitter/status/" +
							element.tweetData.id
					);
					// console.log("oembedData");
					// console.dir(oembedData);
					return oembedData;
				},
				""
			);
			const resolvedOembedObjectSeries = await Promise.all(
				oembedObjectSeries
			);
			// console.log("getoEmbeds");
			// console.dir(resolvedOembedObjectSeries);
			let lastOembed = false;
			const scriptTag = `<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n`;
			const oembedSeries = resolvedOembedObjectSeries.reduce(
				(prevValue, currValue) => {
					lastOembed = currValue;
					const scriptlessTags = currValue.html.replace(
						scriptTag,
						""
					);
					return prevValue + scriptlessTags;
				},
				""
			);
			if (tweetScriptEmbed) {
				lastOembed.html = oembedSeries + scriptTag;
			} else {
				lastOembed.html = oembedSeries;
			}
			// console.log("Final oEmbed", lastOembed);
			linkDataObj.twitterObj = oneOrMoreTweets;
			linkDataObj.oembed = lastOembed;
		} else {
			linkDataObj.oembed = await fetchOEmbed(linkObj.sanitizedLink);
		}
		const jsDom = new JSDOM(responseText);
		const DOMWindowObject = jsDom.window;
		// Meta name
		Object.assign(linkDataObj, processMetadata(DOMWindowObject));
		if (linkDataObj.metadata && linkDataObj.metadata.canonical) {
			linkDataObj.canonical = linkDataObj.metadata.canonical;
		}
		// JSON LD
		Object.assign(linkDataObj.jsonLd, jsonData(DOMWindowObject));
		// Readability
		Object.assign(
			linkDataObj.readabilityObject,
			readabilityData(DOMWindowObject)
		);
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
	readabilityData,
	fetchUrl,
};
