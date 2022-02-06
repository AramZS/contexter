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
	originalLink: "",
	sanitizedLink: "",
	canonical: "",
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
};

const getBestLink = function (data = linkDataObj) {
	return linkDataObj.canonical
		? linkDataObj.canonical
		: linkDataObj.sanitizedLink;
};

const useOembed = function (data = linkDataObj) {
	return data.hasOwnProperty("oembed") && data.oembed.hasOwnProperty("html")
		? data.oembed.html
		: false;
};

const createTitle = (data = linkDataObj, bestLink) => {
	const title = data.finalizedMeta.title;
	return `
	<span class="p-name entry-title" itemprop="headline">
		<a href="${bestLink}" itemprop="url">${title}</a>
  	</span>`;
};

const createByline = (data = linkDataObj) => {
	let author = data.finalizedMeta.author;
	if (!author) {
		author = data.finalizedMeta.creator;
		if (!author) {
			author = data.finalizedMeta.publisher;
		}
	}
	return `<div class="p-author author">
	<span class="p-name byline" rel="author" itemprop="author">${author}</span>
  </div>`;
};

const createTopics = (data = linkDataObj) => {
	const keywords = data.finalizedMeta.topics;
	const keywordsString = keywords.map((word) => {
		return `<span rel="category tag" class="p-category" itemprop="keywords">${word}</span>`;
	});
	return `
		<div itemprop="keywords">
			${keywordsString.join(", ")}
		</div>`;
};

const createSummaryBlock = (data = linkDataObj) => {
	let summary = false;
	if (
		data.finalizedMeta.description &&
		data.finalizedMeta.description != ""
	) {
		summary = data.finalizedMeta.description;
	}
	if (
		!summary &&
		data.metadata.firstParagraph &&
		data.metadata.firstParagraph != ""
	) {
		summary = data.metadata.firstParagraph;
	}
	if (!summary) {
		return "";
	}
	return `
	<summary class="p-summary entry-summary" itemprop="abstract">
		<p>${summary}</p>
	</summary>`;
};

const createDatetimeBlock = (data = linkDataObj) => {
	let date = false;
	if (data.jsonLd) {
		if (data.jsonLd.datePublished) {
			date = data.jsonLd.datePublished;
		} else if (data.jsonLd.dateModified) {
			date = data.jsonLd.dateModified;
		}
	}
	if (!date && data.finalizedMeta && data.finalizedMeta.date) {
		date = data.finalizedMeta.date;
	}
	if (
		!date &&
		data.opengraph &&
		data.opengraph.typeObject &&
		data.opengraph.typeObject.published_time
	) {
		date = data.opengraph.typeObject.published_time;
	}
	if (
		!date &&
		data.opengraph &&
		data.opengraph.typeObject &&
		data.opengraph.typeObject.modified_time
	) {
		date = data.opengraph.typeObject.modified_time;
	}
	if (!date) {
		return "";
	}
	try {
		const dateObj = new Date(date);
		if (dateObj && dateObj != "Invalid Date" && dateObj != "NaN") {
			return `<time class="dt-published published" itemprop="datePublished" datetime="${dateObj.toISOString()}">${dateObj.getMonth()} ${dateObj.getDate()}, ${dateObj.getFullYear()}</time>`;
		} else {
			return "";
		}
	} catch (e) {
		return "";
	}
};

const createImageBlock = (data = linkDataObj) => {
	let imageSrc = "";
	if (
		data &&
		data.finalizedMeta &&
		data.finalizedMeta.image &&
		data.finalizedMeta.image.length
	) {
		imageSrc = data.finalizedMeta.image;
	} else {
		return "";
	}
	return `<img src="${imageSrc}" alt="" itemprop="image" />`;
};

const createArchiveLink = (data = linkDataObj) => {
	let archiveLink = "";
	if (!data || !data.archivedData || !data.archivedData.link) {
		return "";
	} else {
		archiveLink = data.archivedData.link;
	}
	return `<a href="${archiveLink}" target="_blank" itemprop="archivedAt">Archived</a>`;
};

const createLinkBlock = (data = linkDataObj) => {
	const bestLink = getBestLink(data);
	const oembed = useOembed(data);
	if (oembed) {
		return oembed;
	}
	return `
<article id="link-card h-entry hentry" itemscope itemtype="https://schema.org/CreativeWork">
    <div class="thumbnail">
      ${createImageBlock(data)}
    </div>
    <div>
      <header>
        ${createTitle(data, bestLink)}
      </header>
		${createByline(data)}
		${createDatetimeBlock(data)}
		${createSummaryBlock(data)}
		${createTopics(data)}
      <div class="links">
        ${createArchiveLink(data)}
        <a href="${bestLink}" target="_blank" class="read-link" itemprop="isBasedOn">Read</a>
      </div>
    </div>
</article>
  `;
};

module.exports = {
	createLinkBlock,
};
