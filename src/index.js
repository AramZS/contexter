const sanitizeLink = require("./link-sanitizer");
const requestLink = require("./link-sanitizer");

module.exports = (link) => {
	const saneLink = sanitizeLink(link);
	const linkResult = requestLink.getLinkData({
		sanitizedLink: saneLink,
		link: link,
	});
	if (!linkResult || linkResult.status != 200) {
		return false;
	}
	const linkArchiver = createLinkArchive(saneLink);
	const linkHTMLEmbed = createLinkHTMLCard(linkResult);
	return {
		initialLink: link,
		sanitizedLink: saneLink,
		htmlEmbed: linkHTMLEmbed,
		data: linkResult,
	};
};
