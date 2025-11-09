const ua =
	"facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";

export default (link, shuffleExclude = false) => {
	let userAgent = ua;
	// https://developers.whatismybrowser.com/useragents/explore/software_type_specific/?utm_source=whatismybrowsercom&utm_medium=internal&utm_campaign=breadcrumbs
	// https://user-agents.net/lookup
	const userAgents = {
		windows:
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
			"AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 " +
			"Safari/537.36",
		osx14: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36 OPR/72.0.3815.400",
		firefox:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:83.0) Gecko/20100101 Firefox/83.0",
		firefox99:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0",
		osx11: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9",
		baidu_ua: "Baiduspider+(+http://www.baidu.com/search/spider.htm)",
		googlebot: "Googlebot/2.1 (+http://www.google.com/bot.html)",
		modernGooglebot:
			"UCWEB/2.0 (compatible; Googlebot/2.1; +google.com/bot.html)",
		pythonRequests: "python-requests/2.23.0",
		facebookRequests:
			"facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
		lighthouse:
			"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko; Google Page Speed Insights) Chrome/41.0.2272.118 Safari/537.36",
		osx15: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0",
		linux: "Mozilla/5.0 (X11; Linux x86_64)",
		mobileBrave:
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.38 Safari/537.36 Brave/75",
		feedReader:
			"Feedspot/1.0 (+https://www.feedspot.com/fs/fetcher; like FeedFetcher-Google)",
	};
	const substackERx = RegExp("email.substack");
	const substackMGRx = RegExp("mg2.substack");
	const washPostRx = RegExp("s2.washingtonpost.com");
	const washPostStandardRx = RegExp("washingtonpost.com");
	const archiveOrg = RegExp("archive.org");
	const bbergLink = /link\.mail\.bloombergbusiness\.com/;
	const bberg = /bloomberg/;
	const goLink = /r\.g-omedia\.com/;
	const logicLink = /thelogic\.us12\.list-manage\.com/;
	let userAgentSet = false;
	if (link !== false) {
		if (substackMGRx.test(link) || substackERx.test(link)) {
			userAgent = userAgents.baidu_ua;
			userAgentSet = true;
		} else if (washPostRx.test(link)) {
			userAgent = userAgents.lighthouse;
			userAgentSet = true;
		} else if (washPostStandardRx.test(link)) {
			userAgent = userAgents.lighthouse;
			userAgentSet = true;
		} else if (
			bbergLink.test(link) ||
			goLink.test(link) ||
			bberg.test(link)
		) {
			userAgent = userAgents.osx11;
			userAgentSet = true;
		} else if (logicLink.test(link) || archiveOrg.test(link)) {
			userAgent = userAgents.firefox;
			userAgentSet = true;
		}
	}
	if (userAgentSet === false) {
		const keys = Object.keys(userAgents);
		if (shuffleExclude && shuffleExclude.length) {
			const values = Object.values(userAgents);
			shuffleExclude.forEach((excludedUA) => {
				if (false == excludedUA) {
					return;
				}
				var index = values.indexOf(excludedUA);
				if (index > -1) {
					keys.splice(index, 1);
				}
			});
		}
		userAgent = userAgents[keys[Math.floor(Math.random() * keys.length)]];
	}
	return userAgent;
};
