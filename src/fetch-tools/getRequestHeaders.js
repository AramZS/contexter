export default getRequestHeaders = () => {
	return {
		cookie: "usprivacy=1YYY",
		Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"User-Agent": ua,
		"Accept-Encoding": "gzip, deflate", // 'Accept-Encoding': 'gzip, deflate, br',
		"Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8", // 'Accept-Language': 'en-US,en;q=0.9',
		Dnt: "1",
		"Sec-GPC": "1",
		"Upgrade-Insecure-Requests": "1",
		Referer: "https://www.gmail.com/",
	};
};
