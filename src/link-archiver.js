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
	const response = await fetchUrl(saveUrl);

	console.log("Archive Org Check", saveUrl, response);
	return response;
};

module.exports = {
	pushToArchiveIs,
	pushToWayback,
};
