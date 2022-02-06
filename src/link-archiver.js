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
	const waybackResult = await pushToWayback(url);
	archives.link = waybackResult;
	archives.wayback = waybackResult;

	return archives;
};

module.exports = {
	pushToArchiveIs,
	pushToWayback,
	archiveLink,
};
