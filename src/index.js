const sanitizeLink = require("./link-sanitizer");
const requestLink = require("./link-request");
const uidLink = require("./link-uid");

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
	const linkId = uidLink(linkResult.sanitizedLink);
	return {
		initialLink: link,
		sanitizedLink: saneLink,
		htmlEmbed: linkHTMLEmbed,
		linkId: linkId,
		data: linkResult,
	};
};
