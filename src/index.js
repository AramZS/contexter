const sanitizeLink = require("./link-sanitizer");
const requestLink = require("./link-request");
const createLinkArchive = require("./link-archiver");
const uidLink = require("./link-uid");
const createLinkHTMLCard = require("./link-block-maker");

import setConfig from "./config";

const context = async (link, isArchiveLink, canonicalLink, timeout) => {
	setConfig({ timeout: timeout || 35000 });
	const saneLink = sanitizeLink(link);
	const linkResult = await requestLink.getLinkData({
		sanitizedLink: saneLink,
		link: link,
		timeout: timeout || 35000,
	});
	if (!linkResult || linkResult.status != 200) {
		return false;
	}
	let linkArchivedData = {
		link: false,
		wayback: false,
	};
	if (!isArchiveLink) {
		linkArchivedData = await createLinkArchive.archiveLink(
			saneLink,
			timeout || 35000
		);
	} else {
		linkArchivedData = {
			link: link,
			wayback: false,
		};
	}
	const linkId = uidLink(linkResult.sanitizedLink);
	const finalLink = linkResult.canonical
		? linkResult.canonical
		: linkResult.sanitizedLink;
	linkResult.archivedData = linkArchivedData;
	const linkHTMLEmbed = createLinkHTMLCard.createLinkBlock(linkResult);
	return {
		initialLink: isArchiveLink && canonicalLink ? canonicalLink : link,
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
