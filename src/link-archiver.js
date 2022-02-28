var archiveIs = require("archive.is");

const fetchUrl = require("./fetch-tools");

const pushToArchiveIs = async (url) => {
	// Based on https://github.com/palewire/archiveis/blob/master/archiveis/api.py
	const archiveTool = "https://archive.is";
	const archivingPath = "/submit/";
	const saveUrl = archiveTool + archivingPath;

	let result = await archiveIs.save(url);
	console.log(result);
	return result;
};

// https://robustlinks.mementoweb.org/api-docs/
const pushToRobustLinks = async (url) => {
	const archiveTool = "https://robustlinks.mementoweb.org/api/?";
	const archivingPath = "anchor_text=";
	const anchorText = encodeURIComponent("Context Archive Link");
	const urlPath = "url=";
	const encodedUrl = encodeURIComponent(url);
	const saveUrl = `${archiveTool}${archivingPath}${anchorText}&${urlPath}${encodedUrl}`;
	try {
		const response = await fetchUrl(saveUrl);
		if (response.status == 200) {
			const data = await response.json();
			return data;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
};

const pushToWayback = async (url) => {
	const archiveTool = "https://web.archive.org";
	const archivingPath = "/save/";
	const saveUrl = `${archiveTool}${archivingPath}${url}`;
	try {
		const response = await fetchUrl(saveUrl);
		if (response.status == 200) {
			return response.url;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
};

const archiveLink = async (url) => {
	const archives = {
		link: false,
		wayback: false,
	};
	let waybackResult = await pushToWayback(url);
	let archiveLi = false;
	let finalLink = false;
	let robustLinksPush = pushToRobustLinks(url);
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

module.exports = {
	pushToArchiveIs,
	pushToWayback,
	pushToRobustLinks,
	archiveLink,
};
