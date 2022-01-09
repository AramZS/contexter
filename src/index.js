const sanitizeLink = require("./link-sanitizer");

module.exports = (link) => {
	const saneLink = sanitizeLink(link);
	const linkResult = getLinkData(saneLink);
	const linkHTMLEmbed = createLinkHTMLCard(linkResult);
	return {
		initialLink: link,
		retrievedLink: saneLink,
		linkHTMLEmbed,
		...linkResult,
	};
};
