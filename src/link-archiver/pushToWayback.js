import { fetchUrl } from "../fetch-tools";
import { getConfigProp } from "../config";

const pushToWayback = async (url) => {
	const timeout = getConfigProp("timeout");
	const archiveTool = "https://web.archive.org";
	const archivingPath = "/save/";
	const saveUrl = `${archiveTool}${archivingPath}${url}`;
	try {
		const response = await fetchUrl(
			saveUrl,
			{
				timeout,
			},
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:83.0) Gecko/20100101 Firefox/83.0"
		);
		if (response.status == 200) {
			return response.url;
		} else {
			return false;
		}
	} catch (e) {
		return false;
	}
};
