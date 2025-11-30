import { getConfigProp } from "../config";

export const generateArchiveLink = async (url) => {
	const timeout = getConfigProp("timeout");
	const archives = {
		link: false,
		wayback: false,
	};
	let waybackResult = await pushToWayback(url, timeout);
	let archiveLi = false;
	let finalLink = false;
	let robustLinksPush = pushToRobustLinks(url, timeout);
	if (robustLinksPush && robustLinksPush["data-versionurl"]) {
		archiveLi = robustLinksPush["data-versionurl"];
	}
	if (!waybackResult) {
		finalLink = archiveLi;
	} else {
		finalLink = waybackResult;
	}
	archives.link = finalLink;
	archives.wayback = waybackResult;

	return archives;
};
