const sanitizeLink = require("./link-sanitizer");
const requestLink = require("./link-request");
const createLinkArchive = require("./link-archiver");
const uidLink = require("./link-uid");
const createLinkHTMLCard = require("./link-block-maker");

const context = async (link) => {
	const saneLink = sanitizeLink(link);
	const linkResult = await requestLink.getLinkData({
		sanitizedLink: saneLink,
		link: link,
	});
	if (!linkResult || linkResult.status != 200) {
		return false;
	}
	const linkArchivedData = await createLinkArchive.archiveLink(saneLink);
	const linkId = uidLink(linkResult.sanitizedLink);
	const finalLink = linkResult.canonical
		? linkResult.canonical
		: linkResult.sanitizedLink;
	linkResult.archivedData = linkArchivedData;
	const linkHTMLEmbed = createLinkHTMLCard.createLinkBlock(linkResult);
	return {
		initialLink: link,
		sanitizedLink: saneLink,
		finalLink: finalLink,
		htmlEmbed: linkHTMLEmbed,
		linkId: linkId,
		data: linkResult,
	};
};

module.exports = {
	sanitizeLink,
	uidLink,
	context,
	createLinkBlock: createLinkHTMLCard.createLinkBlock,
	createInlineScript: createLinkHTMLCard.createInlineScript,
};
