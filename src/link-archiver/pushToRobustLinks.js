import { fetchUrl } from "../fetch-tools";
import { getConfigProp } from "../config";

// https://robustlinks.mementoweb.org/api-docs/
const pushToRobustLinks = async (url) => {
	const timeout = getConfigProp("timeout");
	const archiveTool = "https://robustlinks.mementoweb.org/api/?";
	const archivingPath = "anchor_text=";
	const anchorText = encodeURIComponent("Context Archive Link");
	const urlPath = "url=";
	const encodedUrl = encodeURIComponent(url);
	const saveUrl = `${archiveTool}${archivingPath}${anchorText}&${urlPath}${encodedUrl}`;
	try {
		const response = await fetchUrl(saveUrl, { timeout });
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
