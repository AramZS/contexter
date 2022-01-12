var archiveIs = require("archive.is");

const pushToArchiveIs = async (url) => {
	// Based on https://github.com/palewire/archiveis/blob/master/archiveis/api.py
	const archiveTool = "https://archive.is";
	const archivingPath = "/submit/";
	const saveUrl = archiveTool + archivingPath;

	let result = await archiveIs.save(url);
	console.log(result);
	return result;
};

module.exports = {
	pushToArchiveIs,
};
