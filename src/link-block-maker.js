var UglifyJS = require("uglify-js");

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

const createInlineScript = () => {
	const innerScript = `
		window.contexterSetup = window.contexterSetup ? window.contexterSetup : function() {
			window.contexterSetupComplete = true;
		class ContexterLink extends HTMLAnchorElement {
		constructor() {
			// Always call super first in constructor
			super();

			// Element functionality written in here
		}
		connectedCallback() {
			this.setAttribute("target", "_blank");
		}
		}
		// https://stackoverflow.com/questions/70716734/custom-web-component-that-acts-like-a-link-anchor-tag
		customElements.define("contexter-link", ContexterLink, {
		extends: "a",
		});
		customElements.define(
		"contexter-inner",
		class extends HTMLElement {
			constructor() {
			// Always call super first in constructor
			super();
			// Element functionality written in here
			}
			attributeChangedCallback(name, oldValue, newValue) {

			}
			connectedCallback() {
			this.className = "contexter-box__inner";
			}
		}
		);
		customElements.define(
		"contexter-thumbnail",
		class extends HTMLElement {
			constructor() {
			// Always call super first in constructor
			super();
			// Element functionality written in here
			}
			attributeChangedCallback(name, oldValue, newValue) {

			}
			connectedCallback() {
			this.className = "contexter-box__thumbnail";
			}
		}
		);
		customElements.define(
		"contexter-byline",
		class extends HTMLElement {
			constructor() {
			// Always call super first in constructor
			super();
			// Element functionality written in here
			}
			attributeChangedCallback(name, oldValue, newValue) {

			}
			connectedCallback() {
			this.className = "contexter-box__byline";
			}
		}
		);
		customElements.define(
		"contexter-keywordset",
		class extends HTMLElement {
			constructor() {
			// Always call super first in constructor
			super();
			// Element functionality written in here
			}
			attributeChangedCallback(name, oldValue, newValue) {

			}
			connectedCallback() {
			this.className = "contexter-box__keywordset";
			}
		}
		);
		customElements.define(
		"contexter-linkset",
		class extends HTMLElement {
			constructor() {
			// Always call super first in constructor
			super();
			// Element functionality written in here
			}
			attributeChangedCallback(name, oldValue, newValue) {

			}
			connectedCallback() {
			this.className = "contexter-box__linkset";
			}
		}
		);
		customElements.define(
		"contexter-meta",
		class extends HTMLElement {
			constructor() {
			// Always call super first in constructor
			super();
			// Element functionality written in here
			}
			attributeChangedCallback(name, oldValue, newValue) {

			}
			connectedCallback() {
			this.className = "contexter-box__meta";
			}
		}
		);
		customElements.define(
		"contexter-summary",
		class extends HTMLElement {
			constructor() {
			// Always call super first in constructor
			super();
			// Element functionality written in here
			}
			attributeChangedCallback(name, oldValue, newValue) {

			}
			connectedCallback() {
			this.className = "p-summary entry-summary";
			}
		}
		);
		customElements.define(
		"contexter-box-head",
		class extends HTMLElement {
			constructor() {
			// Always call super first in constructor
			super();

			// Element functionality written in here
			}
			connectedCallback() {
			this.className = "contexter-box__head";
			}
		}
		);
		customElements.define(
		"contexter-box-inner",
		class extends HTMLElement {
			constructor() {
			// Always call super first in constructor
			super();

			// Element functionality written in here
			}
			connectedCallback() {
			}
		}
		);
		// https://developers.google.com/web/fundamentals/web-components/best-practices
		class ContexterBox extends HTMLElement {
		constructor() {
			// Always call super first in constructor
			super();
			this.first = true;
			this.shadow = this.attachShadow({ mode: "open" });
		}
		connectedCallback() {
			if (this.first){
			this.first = false
			var style = document.createElement("style");
			style.innerHTML = \`
					:host {
						--background: #f5f6f7;
						--border: darkblue;
						--blue: #0000ee;
						--font-color: black;
						--inner-border: black;
						font-family: Franklin,Arial,Helvetica,sans-serif;
						font-size: 14px;
						background: var(--background);
						width: 600px;
						color: var(--font-color);
						min-height: 90px;
						display: block;
						padding: 8px;
						border: 1px solid var(--border);
						cursor: pointer;
						box-sizing: border-box;
						margin: 6px;
						contain: content;
						margin: 6px auto;
					}

					// can only select top-level nodes with slotted
					::slotted(*) {
						max-width: 100%;
						display:block;
					}
					::slotted([slot=thumbnail]) {
						max-width: 100%;
						display:block;
					}
					::slotted([slot=header]) {
						width: 100%;
						font-size: 1.25rem;
						font-weight: bold;
						display:block;
						margin-bottom: 6px;
					}
					::slotted([slot=author]) {
						max-width: 50%;
						font-size: 12px;
						display:inline-block;
						float: left;
					}
					::slotted([slot=time]) {
						max-width: 50%;
						font-size: 12px;
						display:inline-block;
						float: right;
					}
					::slotted([slot=summary]) {
						width: 100%;
						margin-top: 6px;
						padding: 10px 2px;
						border-top: 1px solid var(--inner-border);
						font-size: 15px;
						display:inline-block;
						margin-bottom: 6px;
					}
					contexter-meta {
						height: auto;
						margin-bottom: 4px;
						width: 100%;
						display: grid;
						position: relative;
						min-height: 16px;
						grid-template-columns: repeat(2, 1fr);
					}
					::slotted([slot=keywords]) {
						width: 80%;
						padding: 2px 4px;
						border-top: 1px solid var(--inner-border);
						font-size: 11px;
						display: block;
						float: right;
						font-style: italic;
						text-align: right;
						grid-column: 2/2;
						grid-row: 1;
						align-self: end;
						justify-self: end;
					}
					::slotted([slot=keywords]):empty {
						border-top: 0px solid var(--inner-border);
					}
					::slotted([slot=archive-link]) {
						font-size: 1em;
						display: inline;
					}
					::slotted([slot=archive-link])::after {
						content: "|";
						display: inline;
						color: var(--font-color);
						text-decoration: none;
						margin: 0 .5em;
					}
					::slotted([slot=read-link]) {
						font-size: 1em;
						display: inline;
					}
					contexter-linkset {
						width: 80%;
						padding: 2px 4px;
						font-size: 13px;
						float: left;
						font-weight: bold;
						grid-row: 1;
						grid-column: 1/2;
						align-self: end;
						justify-self: start;
					}
					/* Extra small devices (phones, 600px and down) */
					@media only screen and (max-width: 600px) {
						:host {
						width: 310px;
						}
					}
					/* Small devices (portrait tablets and large phones, 600px and up) */
					@media only screen and (min-width: 600px) {...}
					/* Medium devices (landscape tablets, 768px and up) */
					@media only screen and (min-width: 768px) {...}
					/* Large devices (laptops/desktops, 992px and up) */
					@media only screen and (min-width: 992px) {...}
					/* Extra large devices (large laptops and desktops, 1200px and up) */
					@media only screen and (min-width: 1200px) {...}
					@media (prefers-color-scheme: dark){
						:host {
						--background: #354150;
						--border: #1f2b37;
						--blue: #55b0ff;
						--font-color: #ffffff;
						--inner-border: #787a7c;
						background: var(--background);
						border: 1px solid var(--border)
						}
					}
				\`;
			var lightDomStyle = document.createElement("style");
			lightDomStyle.innerHTML = \`
					contexter-box {
						contain: content;
					}
					contexter-box .read-link {
						font-weight: bold;
					}
					contexter-box a {
						color: #0000ee;
					}
					contexter-box img {
						width: 100%;
						border: 0;
						padding: 0;
						margin: 0;
					}
					/* Extra small devices (phones, 600px and down) */
					@media only screen and (max-width: 600px) {...}
					/* Small devices (portrait tablets and large phones, 600px and up) */
					@media only screen and (min-width: 600px) {...}
					/* Medium devices (landscape tablets, 768px and up) */
					@media only screen and (min-width: 768px) {...}
					/* Large devices (laptops/desktops, 992px and up) */
					@media only screen and (min-width: 992px) {...}
					/* Extra large devices (large laptops and desktops, 1200px and up) */
					@media only screen and (min-width: 1200px) {...}
					@media (prefers-color-scheme: dark){
						contexter-box a {
						color: #55b0ff;
						}
					}
			\`;
			this.appendChild(lightDomStyle);
			//https://stackoverflow.com/questions/49678342/css-how-to-target-slotted-siblings-in-shadow-dom-root
			this.shadow.appendChild(style);
			// https://developers.google.com/web/fundamentals/web-components/shadowdom
			// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots
			const innerContainer = document.createElement("contexter-box-inner")
			this.shadow.appendChild(innerContainer)
			// https://javascript.info/slots-composition
			const innerSlotThumbnail = document.createElement('slot');
			innerSlotThumbnail.name = "thumbnail"
			innerContainer.appendChild(innerSlotThumbnail)
			const innerSlotHeader = document.createElement('slot');
			innerSlotHeader.name = "header"
			innerContainer.appendChild(innerSlotHeader)
			const innerSlotAuthor = document.createElement('slot');
			innerSlotAuthor.name = "author"
			innerContainer.appendChild(innerSlotAuthor)
			const innerSlotTime = document.createElement('slot');
			innerSlotTime.name = "time"
			innerContainer.appendChild(innerSlotTime)
			const innerSlotSummary = document.createElement('slot');
			innerSlotSummary.name = "summary"
			innerContainer.appendChild(innerSlotSummary)

			const metaContainer = document.createElement("contexter-meta");
			innerContainer.appendChild(metaContainer)

			const innerSlotInfo = document.createElement('slot');
			innerSlotInfo.name = "keywords"
			metaContainer.appendChild(innerSlotInfo)

			const linkContainer = document.createElement("contexter-linkset");
			metaContainer.appendChild(linkContainer)
			const innerSlotArchiveLink = document.createElement('slot');
			innerSlotArchiveLink.name = "archive-link"
			linkContainer.appendChild(innerSlotArchiveLink)
			const innerSlotReadLink = document.createElement('slot');
			innerSlotReadLink.name = "read-link"
			linkContainer.appendChild(innerSlotReadLink)

			this.className = "contexter-box";
			this.onclick = (e) => {
				// console.log('Click on block', this)
				if (!e.target.className.includes('read-link') && !e.target.className.includes('title-link')) {
				const mainLinks = this.querySelectorAll('a.main-link');
				// console.log('mainLink', e, mainLinks)
				mainLinks[0].click()
				}
			}
			}
		}
		}

		customElements.define("contexter-box", ContexterBox);
}
if (!window.contexterSetupComplete){
	window.contexterSetup();
}
`;
	const uglifyCode = UglifyJS.minify(innerScript, {
		mangle: false,
		warnings: true,
	});
	// console.log(uglifyCode);
	const scriptElement = `<script>${uglifyCode.code}</script>`;
	return scriptElement;
};

const getBestLink = function (data = linkDataObj) {
	return data.canonical.length > 1 ? data.canonical : data.sanitizedLink;
};

const useOembed = function (data = linkDataObj) {
	return data.hasOwnProperty("oembed") && data.oembed.hasOwnProperty("html")
		? data.oembed.html
		: false;
};

const createTitle = (data = linkDataObj, bestLink) => {
	const title = data.finalizedMeta.title;
	return `
	<contexter-box-head slot="header" class="p-name entry-title" itemprop="headline">
		<a is="contexter-link" href="${bestLink}" itemprop="url">${title}</a>
	</contexter-box-head>`;
};

const createByline = (data = linkDataObj) => {
	let author = data.finalizedMeta.author;
	if (!author) {
		author = data.finalizedMeta.creator;
		if (!author) {
			author = data.finalizedMeta.publisher;
		}
	}
	if (!author) {
		return "";
	}
	return `<contexter-byline class="p-author author" slot="author">
	<span class="p-name byline" rel="author" itemprop="author">${author}</span>
  </contexter-byline>`;
};

const createTopics = (data = linkDataObj) => {
	const keywords = data.finalizedMeta.topics;
	const keywordsString = keywords.map((word) => {
		return `<span rel="category tag" class="p-category" itemprop="keywords">${word}</span>`;
	});
	return `
		<contexter-keywordset itemprop="keywords" slot="keywords">
			${keywordsString.join(", ")}
		</contexter-keywordset>`;
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
	<contexter-summary class="p-summary entry-summary" itemprop="abstract" slot="summary">
		<p>${summary}</p>
	</contexter-summary>`;
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
			return `<time class="dt-published published" slot="time" itemprop="datePublished" datetime="${dateObj.toISOString()}">${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()}</time>`;
		} else {
			return "";
		}
	} catch (e) {
		return "";
	}
};

const createImageBlock = (data = linkDataObj) => {
	let imageSrc = "";
	if (data && data.blobImage && data.blobImage.length) {
		imageSrc = blobImage;
	} else if (
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
	return `<a href="${archiveLink}" is="contexter-link" target="_blank" rel="timemap" class="read-link archive-link" itemprop="archivedAt" slot="archive-link">Archived</a>`;
};

const createLinkBlock = (data = linkDataObj) => {
	const bestLink = getBestLink(data);
	const oembed = useOembed(data);
	if (oembed) {
		return oembed;
	}
	const linkBlock = `
${createInlineScript()}
<contexter-box class="link-card h-entry hentry" itemscope="" itemtype="https://schema.org/CreativeWork">
    <contexter-thumbnail class="thumbnail" slot="thumbnail">
      ${createImageBlock(data)}
    </contexter-thumbnail>
	<contexter-box-head slot="header" class="p-name entry-title" itemprop="headline">
        ${createTitle(data, bestLink)}
    </contexter-box-head>
		${createByline(data)}
		${createDatetimeBlock(data)}
		${createSummaryBlock(data)}
		${createTopics(data)}

        ${createArchiveLink(data)}
		<a is="contexter-link" href="${bestLink}" class="read-link main-link" itemprop="sameAs" slot="read-link">Read</a>

</contexter-box>
  `;
	// Tabbed HTML gets put into a code block.
	const safeLinkBlock = linkBlock.replace(/\t|^\s+|\n|\r/gim, "");
	return safeLinkBlock;
};

module.exports = {
	createLinkBlock,
};
