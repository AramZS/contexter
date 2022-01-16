const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetchUrl = require("./fetch-tools");
const { hasProvider, extract } = require("oembed-parser");

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
		// topics: [],
	};
	let topicsSet = new Set();
	let objectProps = ["metadata", "twitter", "opengraph", "jsonLd"];
	Object.keys(finalizedMeta).forEach((key) => {
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
};
