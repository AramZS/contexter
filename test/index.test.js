var chai = require("chai"),
	expect = chai.expect,
	assert = chai.assert,
	eventually = require("chai-as-promised"),
	should = chai.should();

require("dotenv").config();

const linkModule = require("../src/index");

describe("The Whole Module", function () {
	describe("should archive a basic URL", function async() {
		this.timeout(90000);
		it("should create a URL contexter object", async function () {
			const result = await linkModule(
				"https://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html"
			);
			console.log(Object.keys(result.data));
			expect(result).to.not.equal(false);
			result.should.have.keys(
				"initialLink",
				"sanitizedLink",
				"finalLink",
				"htmlEmbed",
				"linkId",
				"data"
			);
			result.data.should.have.keys(
				"originalLink",
				"sanitizedLink",
				"canonical",
				"htmlText",
				"oembed",
				"readabilityObject",
				"finalizedMeta",
				"jsonLd",
				"status",
				"metadata",
				"dublinCore",
				"opengraph",
				"twitter",
				"archivedData",
				"twitterObj"
			);
			expect(result.data.twitterObj).to.equal(false);
			result.data.finalizedMeta.should.have.keys(
				"title",
				"description",
				"author",
				"creator",
				"publisher",
				"date",
				"subject",
				"image",
				"topics"
			);
			result.data.jsonLd.should.have.keys(
				"@type",
				"headline",
				"description",
				"image",
				"mainEntityOfPage",
				"datePublished",
				"dateModified",
				"isAccessibleForFree",
				"isPartOf",
				"discussionUrl",
				"license",
				"author",
				"publisher",
				"editor",
				"@context",
				"isBasedOn"
			);
			result.data.metadata.should.have.keys(
				"author",
				"title",
				"description",
				"canonical",
				"keywords",
				"image",
				"firstParagraph"
			);
			result.data.opengraph.should.have.keys(
				"title",
				"description",
				"url",
				"site_name",
				"locale",
				"type",
				"typeObject",
				"image"
			);
			result.data.twitter.should.have.keys(
				"site",
				"description",
				"card",
				"creator",
				"title",
				"image"
			);
			result.data.archivedData.should.have.keys("link", "wayback");
		});
	});
	describe("should archive a Tweet thread", function async() {
		this.timeout(120000);
		it("should create a URL contexter object for a tweet", async function () {
			const result = await linkModule(
				"https://twitter.com/Chronotope/status/1275920609097199628"
			);
			console.log(result.data.oembed);
			expect(result).to.not.equal(false);
			result.should.have.keys(
				"initialLink",
				"sanitizedLink",
				"finalLink",
				"htmlEmbed",
				"linkId",
				"data"
			);
			result.data.should.have.keys(
				"originalLink",
				"sanitizedLink",
				"canonical",
				"htmlText",
				"oembed",
				"readabilityObject",
				"finalizedMeta",
				"jsonLd",
				"status",
				"metadata",
				"dublinCore",
				"opengraph",
				"twitter",
				"archivedData",
				"twitterObj"
			);
			expect(result.data.oembed.html.match(/blockquote/g)).to.have.length(
				16
			);
			result.data.finalizedMeta.should.have.keys(
				"title",
				"description",
				"author",
				"creator",
				"publisher",
				"date",
				"subject",
				"image",
				"topics"
			);
			result.data.jsonLd.should.have.keys(
				"@type",
				"headline",
				"description",
				"image",
				"mainEntityOfPage",
				"datePublished",
				"dateModified",
				"isAccessibleForFree",
				"isPartOf",
				"discussionUrl",
				"license",
				"author",
				"publisher",
				"editor"
			);
			result.data.metadata.should.have.keys(
				"author",
				"title",
				"description",
				"canonical",
				"keywords",
				"image",
				"firstParagraph"
			);
			result.data.opengraph.should.have.keys(
				"title",
				"description",
				"url",
				"site_name",
				"locale",
				"type",
				"typeObject",
				"image"
			);
			result.data.twitter.should.have.keys(
				"site",
				"description",
				"card",
				"creator",
				"title",
				"image"
			);
			result.data.archivedData.should.have.keys("link", "wayback");
		});
	});
});

/**
 * {
  initialLink: 'https://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html',
  sanitizedLink: 'https://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html',
  finalLink: 'https://startedwithatweet.substack.com/p/how-spotify-asks-listeners-to-hack',
  htmlEmbed: '\n' +
    '<article id="link-card h-entry hentry" itemscope itemtype="https://schema.org/CreativeWork">\n' +
    '    <div class="thumbnail">\n' +
    '      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="" itemprop="image" />\n' +
    '    </div>\n' +
    '    <div>\n' +
    '      <header>\n' +
    '        \n' +
    '\t<span class="p-name entry-title" itemprop="headline">\n' +
    '\t\t<a href="" itemprop="url">How Spotify asks listeners to hack its algorithm</a>\n' +
    '  \t</span>\n' +
    '      </header>\n' +
    '\t\t<div class="p-author author">\n' +
    '\t<span class="p-name byline" rel="author" itemprop="author">Aram Zucker-Scharff</span>\n' +
    '  </div>\n' +
    '\t\t<time class="dt-published published" itemprop="datePublished" datetime="2020-11-09T15:05:00.000Z">10 9, 2020</time>\n' +
    '\t\t\n' +
    '\t<summary class="p-summary entry-summary" itemprop="abstract">\n' +
    "\t\t<p>Spotify's user experience for music asks us to control recommendations, instead of letting it control us.</p>\n" +
    '\t</summary>\n' +
    '\t\t\n' +
    '\t\t<div itemprop="keywords">\n' +
    '\t\t\t<span rel="category tag" class="p-category" itemprop="keywords">fun</span>, <span rel="category tag" class="p-category" itemprop="keywords">Music</span>\n' +
    '\t\t</div>\n' +
    '      <div class="links">\n' +
    '        <a href="https://web.archive.org/web/20220206030455/https://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html" target="_blank" itemprop="archivedAt">Archived</a>\n' +
    '        <a href="" target="_blank" class="read-link" itemprop="isBasedOn">Read</a>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '</article>\n' +
    '  ',
  linkId: '63d53b12e68d59887318b12066eea47a0f070262',
  data: {
    originalLink: 'https://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html',
    sanitizedLink: 'https://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html',
    canonical: 'https://startedwithatweet.substack.com/p/how-spotify-asks-listeners-to-hack',
    htmlText: '<!DOCTYPE html>\n' +
      '<html>\n' +
      '\n' +
      '  <head>\n' +
      '  <meta charset="utf-8">\n' +
      '  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '\n' +
      '  <title>How Spotify asks listeners to hack its algorithm</title>\n' +
      `  <meta name="description" content="Spotify's user experience for music asks us to control recommendations, instead of letting it control us.">\n` +
      '\n' +
      '  <link rel="stylesheet" href="/css/main.css">\n' +
      '  \n' +
      '  <link rel="canonical" href="https://startedwithatweet.substack.com/p/how-spotify-asks-listeners-to-hack">\n' +
      '  \n' +
      '  <link rel="alternate" type="application/rss+xml" title="Fight With Tools by AramZS" href="http://aramzs.github.io/feed.xml">\n' +
      '\n' +
      '  <meta name="author" content="Aram Zucker-Scharff" />\n' +
      '\n' +
      '  <meta property="og:title" content="How Spotify asks listeners to hack its algorithm">\n' +
      '  <meta property="og:site_name" content="Fight With Tools by AramZS" />\n' +
      `  <meta property="og:description" content="Spotify's user experience for music asks us to control recommendations, instead of letting it control us.">\n` +
      '  <meta property="og:url" content="http://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html" />\n' +
      '  <meta property="og:locale" content="en_US" />\n' +
      '  <meta name="twitter:site" content="@chronotope" />\n' +
      `  <meta name="twitter:description" content="Spotify's user experience for music asks us to control recommendations, instead of letting it control us." />\n` +
      '\n' +
      '  \n' +
      '  \t<!-- Article specific OG data -->\n' +
      '  \t<meta property="og:type" content="article" />\n' +
      '  \t<meta property="article:published_time" content="2020-11-09 10:05:00 -0500" />\n' +
      '  \t\n' +
      '  \t<meta property="article:author" content="http://facebook.com/aramzs" />\n' +
      '    <meta property="article:publisher" content="https://www.facebook.com/aramzs" />\n' +
      '  \t<meta property="article:section" content="Music" />\n' +
      '  \t\n' +
      '  \t\t<meta property="article:tag" content="fun" />\n' +
      '  \t\n' +
      '\t<meta name="keywords" content="fun" />\n' +
      '\n' +
      '  \t<meta name="twitter:card" content="summary_large_image" />\n' +
      '  \t<meta name="twitter:creator" content="@chronotope" />\n' +
      '  \t<meta name="twitter:title" content="How Spotify asks listeners to hack its algorithm" />\n' +
      '\t\n' +
      '\t  \t<meta property="og:image" content="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" />\n' +
      '\t  \t<meta name="twitter:image" content="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" />\n' +
      '  \t\n' +
      '\t\n' +
      '\t\n' +
      '\t\t<script type="application/ld+json">\n' +
      '    {\n' +
      '        "@context": "http://schema.org",\n' +
      '        "@type": "BlogPosting",\n' +
      '        "headline": "How Spotify asks listeners to hack its algorithm",\n' +
      `        "description": "Spotify's user experience for music asks us to control recommendations, instead of letting it control us.",\n` +
      '        "image": [\n' +
      '            \n' +
      '                "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"\n' +
      '            \n' +
      '        ],\n' +
      '        "mainEntityOfPage": {\n' +
      '            "@type": "WebPage",\n' +
      '            "@id": "http://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html"\n' +
      '        },\n' +
      '        "datePublished": "2020-11-09 10:05:00 -0500",\n' +
      '        "dateModified": "2020-11-09 10:05:00 -0500",\n' +
      '        "isAccessibleForFree": "True",\n' +
      '        "isBasedOn": "https://startedwithatweet.substack.com/p/how-spotify-asks-listeners-to-hack",\n' +
      '        "isPartOf": {\n' +
      '            "@type": ["CreativeWork", "Product", "Blog"],\n' +
      '            "name": "Fight With Tools",\n' +
      '            "productID": "aramzs.github.io"\n' +
      '        },\n' +
      '        "license": "http://creativecommons.org/licenses/by-sa/4.0/",\n' +
      '        "author": {\n' +
      '            "@type": "Person",\n' +
      '            "name": "Aram Zucker-Scharff",\n' +
      '            "description": "Aram Zucker-Scharff is Director for Ad Engineering at Washington Post, lead dev for PressForward and a consultant. Tech solutions for journo problems.",\n' +
      '            "sameAs": "http://aramzs.github.io/aramzs/",\n' +
      '            "image": {\n' +
      '                "@type": "ImageObject",\n' +
      '                "url": "https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/Aram-Zucker-Scharff-square.jpg"\n' +
      '            },\n' +
      '            "givenName": "Aram",\n' +
      '            "familyName": "Zucker-Scharff",\n' +
      '            "alternateName": "AramZS",\n' +
      '            "publishingPrinciples": "http://aramzs.github.io/about/"\n' +
      '        },\n' +
      '        "publisher": {\n' +
      '            "@type": "Organization",\n' +
      '            "name": "Fight With Tools",\n' +
      `            "description": "A site discussing how to imagine, build, analyze and use cool code and web tools. Better websites, better stories, better developers. Technology won't save the world, but you can.",\n` +
      '            "sameAs": "http://aramzs.github.io",\n' +
      '            "logo": {\n' +
      '                "@type": "ImageObject",\n' +
      '                "url": "https://41.media.tumblr.com/709bb3c371b9924add351bfe3386e946/tumblr_nxdq8uFdx81qzocgko1_1280.jpg"\n' +
      '            },\n' +
      '            "publishingPrinciples": "http://aramzs.github.io/about/"\n' +
      '        }\n' +
      '    }\n' +
      '</script>\n' +
      '\n' +
      '\t\n' +
      '\n' +
      '  \n' +
      '\n' +
      '  \t<link rel="icon" type="image/png" href="https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/favicon.ico">\n' +
      '\t<script>\n' +
      "\t  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n" +
      '\t  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n' +
      '\t  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n' +
      "\t  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n" +
      '\n' +
      "\tga('create', 'UA-87149202-1', 'auto');\n" +
      "\tga('set', 'anonymizeIp', true);\n" +
      "\tga('send', 'pageview');\n" +
      '\t</script>\n' +
      '</head>\n' +
      '\n' +
      '\n' +
      '  <body class=" post ">\n' +
      '\n' +
      '    <header class="site-header">\n' +
      '\n' +
      '  <div class="wrapper">\n' +
      '\n' +
      '    <a class="site-title" href="/">Fight With Tools by AramZS</a>\n' +
      '\n' +
      '    <nav class="site-nav">\n' +
      '      <a href="#" class="menu-icon">\n' +
      '        <svg viewBox="0 0 18 15">\n' +
      '          <path fill="#424242" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z"/>\n' +
      '          <path fill="#424242" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z"/>\n' +
      '          <path fill="#424242" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z"/>\n' +
      '        </svg>\n' +
      '      </a>\n' +
      '\n' +
      '      <div class="trigger">\n' +
      '        \n' +
      '          \n' +
      '          <a class="page-link" href="/about/">About</a>\n' +
      '          \n' +
      '        \n' +
      '          \n' +
      '        \n' +
      '          \n' +
      '        \n' +
      '          \n' +
      '        \n' +
      '          \n' +
      '          <a class="page-link" href="/aramzs/">Who is Aram?</a> \n' +
      '          \n' +
      '        \n' +
      '          \n' +
      '        \n' +
      '      </div>\n' +
      '    </nav>\n' +
      '\n' +
      '  </div>\n' +
      '\n' +
      '</header>\n' +
      '\n' +
      '\n' +
      '    <div class="page-content">\n' +
      '      <div class="wrapper">\n' +
      '        <article class="post single post-with-image" itemscope itemtype="http://schema.org/BlogPosting">\n' +
      '  <div itemprop="mainEntityOfPage">\n' +
      '    <header class="post-header">\n' +
      '      <div class="header-sub-box">\n' +
      '        <div class="title-box">\n' +
      '          <h1 class="post-title" itemprop="name headline">How Spotify asks listeners to hack its algorithm</h1>\n' +
      '        </div>\n' +
      '        \n' +
      '        <div class="post-image blue image-overlay">\n' +
      '          <img itemprop="image" alt="How Spotify asks listeners to hack its algorithm" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" />\n' +
      '        </div>\n' +
      '        \n' +
      '    </div>\n' +
      '      <p class="post-meta">\n' +
      '        <time datetime="2020-11-09T10:05:00-05:00" itemprop="datePublished">Nov 9, 2020</time><time datetime="2020-11-09T10:05:00-05:00" itemprop="dateModified"  style="display:none;" >2020-11-09 10:05:00 -0500</time> • By \n' +
      '        <span itemprop="author" itemscope itemtype="http://schema.org/Person">\n' +
      '          \n' +
      '          <span itemprop="name">Aram Zucker-Scharff</span>\n' +
      '        </span>\n' +
      '        <span itemprop="publisher" style="display:none;" itemscope itemtype="http://schema.org/Organization">\n' +
      '          <span itemprop="name">Fight With Tools</span>\n' +
      '          <span itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">\n' +
      '            <img itemprop="url" src="https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/favicon.ico" />\n' +
      '          </span>\n' +
      '        </span>\n' +
      '      </p>\n' +
      '    </header>\n' +
      '\n' +
      '    <div class="post-content" itemprop="articleBody">\n' +
      '      <p>I listen to a lot of music and one of the things I noticed over the years is that I got stuck in a rut. Listening to the same things over and over again and not really picking up anything new. A problem with algorithmic recommendations, of music, or anything really, is that they can trap you with more and more specificity, narrowing around your interests instead of broadening horizons.</p>\n' +
      '\n' +
      '<p>This narrowing has become even more difficult to escape now that my entire music experience is filtered through a streaming service, there’s no longer any time to trip over a song on the radio or even stumble over a recommendation on a pirating site. Even if someone was going to lend me a CD, I don’t have anything to play it anymore. Taking a single recommendation often isn’t enough to break out of the effect of my overall listening pattern. If I do nothing but passively consume music via a streaming service, I’ll likely never be pushed to the edge, much less out, of my comfort zone.</p>\n' +
      '\n' +
      '<p>This problem isn’t just one of music recommendations. Only, I think there’s a solution that leverages the algorithmic recommendation process to broaden, instead of limit, us and we can see it already in Spotify.</p>\n' +
      '\n' +
      '<h2 id="the-sweet-escape">The Sweet Escape</h2>\n' +
      '\n' +
      '<p>A brief guide to breaking your way out of your musical comfort zone.</p>\n' +
      '\n' +
      '<h3 id="leveraging-organic-encounters">Leveraging Organic encounters</h3>\n' +
      '\n' +
      '<p>In the world of the web, the term “organic” is used for a piece of content we find through actively searching for it, when it comes to music there is a similar process. I’m always fast on the Shazam trigger if I hear a song I '... 19053 more characters,
    oembed: false,
    readabilityObject: {
      title: 'How Spotify asks listeners to hack its algorithm',
      content: '<div id="readability-page-1" class="page"><div>\n' +
        '        <article itemscope="" itemtype="http://schema.org/BlogPosting">\n' +
        '  <div itemprop="mainEntityOfPage">\n' +
        '      <p>I listen to a lot of music and one of the things I noticed over the years is that I got stuck in a rut. Listening to the same things over and over again and not really picking up anything new. A problem with algorithmic recommendations, of music, or anything really, is that they can trap you with more and more specificity, narrowing around your interests instead of broadening horizons.</p>\n' +
        '\n' +
        '<p>This narrowing has become even more difficult to escape now that my entire music experience is filtered through a streaming service, there’s no longer any time to trip over a song on the radio or even stumble over a recommendation on a pirating site. Even if someone was going to lend me a CD, I don’t have anything to play it anymore. Taking a single recommendation often isn’t enough to break out of the effect of my overall listening pattern. If I do nothing but passively consume music via a streaming service, I’ll likely never be pushed to the edge, much less out, of my comfort zone.</p>\n' +
        '\n' +
        '<p>This problem isn’t just one of music recommendations. Only, I think there’s a solution that leverages the algorithmic recommendation process to broaden, instead of limit, us and we can see it already in Spotify.</p>\n' +
        '\n' +
        '<h2 id="the-sweet-escape">The Sweet Escape</h2>\n' +
        '\n' +
        '<p>A brief guide to breaking your way out of your musical comfort zone.</p>\n' +
        '\n' +
        '<h3 id="leveraging-organic-encounters">Leveraging Organic encounters</h3>\n' +
        '\n' +
        '<p>In the world of the web, the term “organic” is used for a piece of content we find through actively searching for it, when it comes to music there is a similar process. I’m always fast on the Shazam trigger if I hear a song I like in a restaurant, movie or film. In the days I went outside (because we weren’t in a pandemic) I’d find a lot of very different songs that way. I also like Sofar Sounds concerts, I go in not knowing what music I’m going to get and potentially find something very different to enjoy.</p>\n' +
        '\n' +
        '<p>Once I get a song I like, that doesn’t really sound like anything else to which I listen, the first thing I do is head to the artist’s <strong>About</strong> page on Spotify. From there I can follow links to <strong>Discovered On</strong>, a set of playlists that include the artist. While one song isn’t enough to escape the reinforcement of listening to the same music on loop, a whole new playlist of similar music starts to open things up.</p>\n' +
        '\n' +
        '<p>A good example is the time I stumbled across <a href="https://open.spotify.com/artist/0ZCO8oVkMj897cKgFH7fRW?si=gkUElgaORjqoibYnq_TgQg">Los Ángeles Azules</a>’ “Amor A Primera Vista” in a restaurant. Their About page led me to a Spotify-created playlist around <a href="https://open.spotify.com/playlist/37i9dQZF1DWTmGGCbcoQhY?si=6EbUBPTUSFe2em1AClt7xA">Cumbia Sonidera</a> and checking through their Fans Also Like page let me dive into some similar bands.</p>\n' +
        '\n' +
        '<h3 id="stealing-from-friends">Stealing from Friends</h3>\n' +
        '\n' +
        '<p>As you dig into these different playlists, you’ll find that listening impacts your Discovery playlist, which uses similar algorithmic tools to generate suggestions. If you go wild in your journeys outside your comfort zone you may find it becomes a little less useful.</p>\n' +
        '\n' +
        '<p><img src="https://media1.tenor.com/images/f2688dbd3ace6baed89be514193dfba7/tenor.gif?itemid=14993711" alt="Breaking my grove by breaking my Discover playlist"></p>\n' +
        '\n' +
        '<p>I’m <a href="https://twitter.com/Chronotope/status/1000748313963089921">pretty sure I’ve broken my Discover playlist</a> because it seems to often be filled with stuff I don’t particularly like. One time it was filled with <a href="https://twitter.com/Chronotope/status/982376399766999041">bitcoin rap about “lambos”,</a> which was the worst. If I’m looking for an antidote, but with nothing particular in mind, I also look for new music by finding other people’s Discovery playlists in the Friend Activity feed. Now I have a folder entirely composed of other people’s Discovery playlists. It’s great because some of my friends have better and sometimes very different musical tastes than I. Hopping into a friend’s Discover playlist is a lot of fun, as it puts you outside your comfort zone, and is also a great exercise in listening to entirely different kinds of music.</p>\n' +
        '\n' +
        '<p>Occasionally there will be something great in my Discovery playlist, even now, so you can <a href="https://open.spotify.com/playlist/37i9dQZEVXcEWUzYxxxhEC?si=Fipy_U5nSGKKuYtoi4HQXw">make mine the first you explore</a>.</p>\n' +
        '\n' +
        '<p>This just scratches the surface of how you can dig into the algorithm for more musical variety.</p>\n' +
        '\n' +
        '<h3 id="using-the-relationship-graph">Using the Relationship Graph</h3>\n' +
        '\n' +
        '<p>Every Noise at Once is an algorithmic attempt to categorize music by genre and then place those genres and the bands that play them in relationship to each other. The <a href="http://everynoise.com/EverynoiseIntro.pdf">project emerged from trying to understand what a musical genre even is and how one could even recommend songs on that basis</a> and is part of a system that was purchased by Spotify to help run the recommendation system you encounter in their app today.</p>\n' +
        '\n' +
        '<p>Here’s what the ENaO graph looks like for Classic Rock, one example of a genre I frequency listen to:</p>\n' +
        '\n' +
        '<p><img src="https://github.com/AramZS/aramzs.github.io/blob/master/_includes/classicrock-band-space.PNG?raw=true" alt="Every Noise at Once Band Cloud for Classic Rock"></p>\n' +
        '\n' +
        '<p>In <a href="http://everynoise.com/EverynoiseIntro.pdf">the description of how this algorithmic sorting came to be</a> engineer Glenn McDonald notes:</p>\n' +
        '\n' +
        '<blockquote>\n' +
        '  <p>The approach allows us (or our customers) to seed, and then organically grow, a new genre or style from essentially any inspiration. In a couple peculiar cases, we’ve gathered an initial artist list, let the computers give us some songs, and only then listened to those songs to find out what kind of music we were even talking about.</p>\n' +
        '</blockquote>\n' +
        '\n' +
        '<p>By creating a system which can organically enter into a genre and essentially reverse engineer it, Spotify has a tool that lets me easily break out of any musical bubble and find my way–<a href="https://bit.ly/32hN4vJ">wikipedia-effect-style</a>–into entirely new universes of music.</p>\n' +
        '\n' +
        '<p>ENaO brings forth the ability to see the relationship graph of a genre. Here’s Classic Rock’s closely related genres (based on how listeners act, not on any historical reasoning).</p>\n' +
        '\n' +
        '<p><img src="https://github.com/AramZS/aramzs.github.io/blob/master/_includes/classic-rock-sound-space.PNG?raw=true" alt="Musical Genres by Closeness of type to Classic Rock"></p>\n' +
        '\n' +
        '<p>Now if I want to make a small move, say I want to still get some of the sound of classic rock but move away from the core music of the genre I might choose to move towards psychedelic rock, traditional folk, or art rock. The position tells me a little about the genre in relation to Classic Rock: “down is more organic, up is more mechanical and electric; left is denser and more atmospheric, right is spikier and bouncier.” But ENaO gives me another option, the inverse graph:</p>\n' +
        '\n' +
        '<p><img src="https://github.com/AramZS/aramzs.github.io/blob/master/_includes/classic-rock-inverse-sound.PNG?raw=true" alt="Musical Genres by Inverse of type to Classic Rock"></p>\n' +
        '\n' +
        '<p>Now, if I’m feeling like I really want to flip my listening on my head I can pick something totally opposite of my normal genre. Perhaps Fluxwork or some Montreal Indie?</p>\n' +
        '\n' +
        '<p>From the Map area of ENaO I can expand the playlists I might explore based on a particular genre. The map shows a set of bands that I can try exploring individually. I can also head to one of the playlist links:</p>\n' +
        '\n' +
        '<ul>\n' +
        '  <li><code>playlist</code> sends me to “The Sounds of [Genre]” playlists on Spotify. When I stumble across an interesting genre I will often save the Sounds Of playlist for later when I’m in the mood to explore it a bit deeper. As a result I have a <a href="https://open.spotify.com/playlist/1ga7kXhbcB4tsOfpZqP7UX?si=erThuQAVTlSKKmxMCTNAPw">whole</a> <a href="https://open.spotify.com/playlist/5m9ErLc15dYYCGzvrcVy8q?si=MUdGuOlGTBm1D2XkSCrC_A">bunch</a> <a href="https://open.spotify.com/playlist/5INg0fRsoA1uYyyJwliHGS?si=GZvBDr6MQfSMHZ89zY5SjQ">of</a> <a href="https://open.spotify.com/playlist/1qpcTBjAx26Xiw6ZClVVGm?si=rbc7JlryRWuiwJ8OCkassA">these</a> <a href="https://open.spotify.com/playlist/1qpcTBjAx26Xiw6ZClVVGm?si=SdUteV0sRgW7JsXEU2bmQg">playlists</a> which essentially act as up-to-date overviews to the genre I can dive into at any time.</li>\n' +
        '  <li><code>intro</code> is essentially an ‘introduction’ to this genre with music that represents the core sound and is most popular among listeners of the genre.</li>\n' +
        '  <li><code>pulse</code> is an interesting look at which songs listeners of this genre currently prefer.</li>\n' +
        '  <li><code>edge</code> is a fun one that shows you songs that people who like this genre currently enjoy outside the genre itself. It’s another great tool for pulling yourself out of a listening rut.</li>\n' +
        '</ul>\n' +
        '\n' +
        '<p>I might go to one or all of those playlists depending on how curious I am in order to find new music and save it to my liked songs.</p>\n' +
        '\n' +
        '<h2 id="dont-stop-the-music">Don’t Stop the Music</h2>\n' +
        '\n' +
        '<p>Once I find a song or genre I like, of course not every related song is my cup of tea, in the same way I like some classic rock bands, but not others. This is the part where I can “hack” the algorithm to help me develop an ear for a particular genre without knowing much about it. This is especially useful for me when I, an English-speaker, explore non-English genres. Here’s how it works:</p>\n' +
        '\n' +
        '<p>My neighborhood Vietnamese restaurant plays really great Thai music. Of course, I didn’t know what type of music it was or even what language it was in when I first heard it, I had to Shazam it. The nature of explorin'... 7277 more characters,
      textContent: '\n' +
        '        \n' +
        '  \n' +
        '      I listen to a lot of music and one of the things I noticed over the years is that I got stuck in a rut. Listening to the same things over and over again and not really picking up anything new. A problem with algorithmic recommendations, of music, or anything really, is that they can trap you with more and more specificity, narrowing around your interests instead of broadening horizons.\n' +
        '\n' +
        'This narrowing has become even more difficult to escape now that my entire music experience is filtered through a streaming service, there’s no longer any time to trip over a song on the radio or even stumble over a recommendation on a pirating site. Even if someone was going to lend me a CD, I don’t have anything to play it anymore. Taking a single recommendation often isn’t enough to break out of the effect of my overall listening pattern. If I do nothing but passively consume music via a streaming service, I’ll likely never be pushed to the edge, much less out, of my comfort zone.\n' +
        '\n' +
        'This problem isn’t just one of music recommendations. Only, I think there’s a solution that leverages the algorithmic recommendation process to broaden, instead of limit, us and we can see it already in Spotify.\n' +
        '\n' +
        'The Sweet Escape\n' +
        '\n' +
        'A brief guide to breaking your way out of your musical comfort zone.\n' +
        '\n' +
        'Leveraging Organic encounters\n' +
        '\n' +
        'In the world of the web, the term “organic” is used for a piece of content we find through actively searching for it, when it comes to music there is a similar process. I’m always fast on the Shazam trigger if I hear a song I like in a restaurant, movie or film. In the days I went outside (because we weren’t in a pandemic) I’d find a lot of very different songs that way. I also like Sofar Sounds concerts, I go in not knowing what music I’m going to get and potentially find something very different to enjoy.\n' +
        '\n' +
        'Once I get a song I like, that doesn’t really sound like anything else to which I listen, the first thing I do is head to the artist’s About page on Spotify. From there I can follow links to Discovered On, a set of playlists that include the artist. While one song isn’t enough to escape the reinforcement of listening to the same music on loop, a whole new playlist of similar music starts to open things up.\n' +
        '\n' +
        'A good example is the time I stumbled across Los Ángeles Azules’ “Amor A Primera Vista” in a restaurant. Their About page led me to a Spotify-created playlist around Cumbia Sonidera and checking through their Fans Also Like page let me dive into some similar bands.\n' +
        '\n' +
        'Stealing from Friends\n' +
        '\n' +
        'As you dig into these different playlists, you’ll find that listening impacts your Discovery playlist, which uses similar algorithmic tools to generate suggestions. If you go wild in your journeys outside your comfort zone you may find it becomes a little less useful.\n' +
        '\n' +
        '\n' +
        '\n' +
        'I’m pretty sure I’ve broken my Discover playlist because it seems to often be filled with stuff I don’t particularly like. One time it was filled with bitcoin rap about “lambos”, which was the worst. If I’m looking for an antidote, but with nothing particular in mind, I also look for new music by finding other people’s Discovery playlists in the Friend Activity feed. Now I have a folder entirely composed of other people’s Discovery playlists. It’s great because some of my friends have better and sometimes very different musical tastes than I. Hopping into a friend’s Discover playlist is a lot of fun, as it puts you outside your comfort zone, and is also a great exercise in listening to entirely different kinds of music.\n' +
        '\n' +
        'Occasionally there will be something great in my Discovery playlist, even now, so you can make mine the first you explore.\n' +
        '\n' +
        'This just scratches the surface of how you can dig into the algorithm for more musical variety.\n' +
        '\n' +
        'Using the Relationship Graph\n' +
        '\n' +
        'Every Noise at Once is an algorithmic attempt to categorize music by genre and then place those genres and the bands that play them in relationship to each other. The project emerged from trying to understand what a musical genre even is and how one could even recommend songs on that basis and is part of a system that was purchased by Spotify to help run the recommendation system you encounter in their app today.\n' +
        '\n' +
        'Here’s what the ENaO graph looks like for Classic Rock, one example of a genre I frequency listen to:\n' +
        '\n' +
        '\n' +
        '\n' +
        'In the description of how this algorithmic sorting came to be engineer Glenn McDonald notes:\n' +
        '\n' +
        '\n' +
        '  The approach allows us (or our customers) to seed, and then organically grow, a new genre or style from essentially any inspiration. In a couple peculiar cases, we’ve gathered an initial artist list, let the computers give us some songs, and only then listened to those songs to find out what kind of music we were even talking about.\n' +
        '\n' +
        '\n' +
        'By creating a system which can organically enter into a genre and essentially reverse engineer it, Spotify has a tool that lets me easily break out of any musical bubble and find my way–wikipedia-effect-style–into entirely new universes of music.\n' +
        '\n' +
        'ENaO brings forth the ability to see the relationship graph of a genre. Here’s Classic Rock’s closely related genres (based on how listeners act, not on any historical reasoning).\n' +
        '\n' +
        '\n' +
        '\n' +
        'Now if I want to make a small move, say I want to still get some of the sound of classic rock but move away from the core music of the genre I might choose to move towards psychedelic rock, traditional folk, or art rock. The position tells me a little about the genre in relation to Classic Rock: “down is more organic, up is more mechanical and electric; left is denser and more atmospheric, right is spikier and bouncier.” But ENaO gives me another option, the inverse graph:\n' +
        '\n' +
        '\n' +
        '\n' +
        'Now, if I’m feeling like I really want to flip my listening on my head I can pick something totally opposite of my normal genre. Perhaps Fluxwork or some Montreal Indie?\n' +
        '\n' +
        'From the Map area of ENaO I can expand the playlists I might explore based on a particular genre. The map shows a set of bands that I can try exploring individually. I can also head to one of the playlist links:\n' +
        '\n' +
        '\n' +
        '  playlist sends me to “The Sounds of [Genre]” playlists on Spotify. When I stumble across an interesting genre I will often save the Sounds Of playlist for later when I’m in the mood to explore it a bit deeper. As a result I have a whole bunch of these playlists which essentially act as up-to-date overviews to the genre I can dive into at any time.\n' +
        '  intro is essentially an ‘introduction’ to this genre with music that represents the core sound and is most popular among listeners of the genre.\n' +
        '  pulse is an interesting look at which songs listeners of this genre currently prefer.\n' +
        '  edge is a fun one that shows you songs that people who like this genre currently enjoy outside the genre itself. It’s another great tool for pulling yourself out of a listening rut.\n' +
        '\n' +
        '\n' +
        'I might go to one or all of those playlists depending on how curious I am in order to find new music and save it to my liked songs.\n' +
        '\n' +
        'Don’t Stop the Music\n' +
        '\n' +
        'Once I find a song or genre I like, of course not every related song is my cup of tea, in the same way I like some classic rock bands, but not others. This is the part where I can “hack” the algorithm to help me develop an ear for a particular genre without knowing much about it. This is especially useful for me when I, an English-speaker, explore non-English genres. Here’s how it works:\n' +
        '\n' +
        'My neighborhood Vietnamese restaurant plays really great Thai music. Of course, I didn’t know what type of music it was or even what language it was in when I first heard it, I had to Shazam it. The nature of exploring music this way is sort of naive so please excuse any factual errors to follow. Over the course of one dinner I had a few songs that I could explore. “โคตรเลวในดวงใจ” by Takkatan Chollada is classified as Thai pop country. “เสียเวลาว่ะ” by electric.neon.lamp is in Thai pop indie playlists while “เสพติดความเจ็บปวด” by The Yers appears to be Thai pop rock. These are assumptions I make by looking at the Discovered On playlists and translating the names.\n' +
        '\n' +
        '\n' +
        '\n' +
        'Judging on these three songs it looks like I would enjoy Thai Pop music. Now I can throw these songs together into a playlist. When I create a Spotify playlist around songs from a new genre, it only takes a few entries before I can scroll to the bottom and use the Recommended Songs area.\n' +
        '\n' +
        '\n' +
        '\n' +
        'By hopping into that section and listening further for what I enjoy, I can pretty quickly develop a playlist of my favorite parts of this genre I’m newly exploring, without knowing a lot except the particular sound that appeals to me.\n' +
        '\n' +
        'This is sort of similar to the framework of Pandora, but is far more interesting because your seeding of the playlist can be a lot more focused and the way Spotify handles it gives you more transparency and control.\n' +
        '\n' +
        'Getting a Taste\n' +
        '\n' +
        'Once I do this for long enough, I start to develop a better ear for the subtleties of a specific genre. I may not have the tools of a music academic, so excuse my lack of proper terminology, but I will start to hear particular sounds or auditory themes that I groove to. I start by adding those into the playlist, but when I can start to differentiate the sub-genres by ear there comes a time to subdivide.\n' +
        '\n' +
        'When I started, I saw all three of those songs above as “Thai Pop”, but by looking at what playlists they are in and listening to them and any of the recommended songs I enjoy, I start to get a sense of what differentiates them.\n' +
        '\n' +
        'I’ll act on my new understanding of those differences by splitting the playlist into the three genres of Thai music that I perceive. Thai Pop, Thai Rock, and Luk thung (please excuse my ignorance as there is not a lot easily translatable or in English about most non-English music genres, but a rough description of this genre–as I understand it–is Thai Folk Country music. I highly recommend the Luk thung Wikipedia article).\n' +
        '\n' +
        'Every Day I’m Shuffling\n' +
        '\n' +
        'The key to this process is the Recommended Songs list at the end of every playlist. It’s a part'... 2748 more characters,
      length: 12748,
      excerpt: "Spotify's user experience for music asks us to control recommendations, instead of letting it control us.",
      byline: 'Aram Zucker-Scharff',
      dir: null,
      siteName: 'Fight With Tools'
    },
    finalizedMeta: {
      title: 'How Spotify asks listeners to hack its algorithm',
      description: "Spotify's user experience for music asks us to control recommendations, instead of letting it control us.",
      author: 'Aram Zucker-Scharff',
      creator: 'Aram Zucker-Scharff',
      publisher: 'Fight With Tools',
      date: '',
      subject: '',
      image: [Array],
      topics: [Array]
    },
    jsonLd: {
      '@type': 'BlogPosting',
      headline: 'How Spotify asks listeners to hack its algorithm',
      description: "Spotify's user experience for music asks us to control recommendations, instead of letting it control us.",
      image: [Array],
      mainEntityOfPage: [Object],
      datePublished: '2020-11-09 10:05:00 -0500',
      dateModified: '2020-11-09 10:05:00 -0500',
      isAccessibleForFree: 'True',
      isPartOf: [Object],
      discussionUrl: false,
      license: 'http://creativecommons.org/licenses/by-sa/4.0/',
      author: [Object],
      publisher: [Object],
      editor: [Object],
      '@context': 'http://schema.org',
      isBasedOn: 'https://startedwithatweet.substack.com/p/how-spotify-asks-listeners-to-hack'
    },
    status: 200,
    metadata: {
      author: 'Aram Zucker-Scharff',
      title: 'How Spotify asks listeners to hack its algorithm',
      description: "Spotify's user experience for music asks us to control recommendations, instead of letting it control us.",
      canonical: 'https://startedwithatweet.substack.com/p/how-spotify-asks-listeners-to-hack',
      keywords: [Array],
      image: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
      firstParagraph: '\n' +
        '        Nov 9, 20202020-11-09 10:05:00 -0500 • By \n' +
        '        \n' +
        '          \n' +
        '          Aram Zucker-Scharff\n' +
        '        \n' +
        '        \n' +
        '          Fight With Tools\n' +
        '          \n' +
        '            \n' +
        '          \n' +
        '        \n' +
        '      '
    },
    dublinCore: {},
    opengraph: {
      title: 'How Spotify asks listeners to hack its algorithm',
      description: "Spotify's user experience for music asks us to control recommendations, instead of letting it control us.",
      url: 'http://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html',
      site_name: 'Fight With Tools by AramZS',
      locale: 'en_US',
      type: 'article',
      typeObject: [Object],
      image: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png'
    },
    twitter: {
      site: '@chronotope',
      description: "Spotify's user experience for music asks us to control recommendations, instead of letting it control us.",
      card: 'summary_large_image',
      creator: '@chronotope',
      title: 'How Spotify asks listeners to hack its algorithm',
      image: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png'
    },
    archivedData: {
      link: 'https://web.archive.org/web/20220206030455/https://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html',
      wayback: 'https://web.archive.org/web/20220206030455/https://aramzs.github.io/fun/2020/11/09/spotify-asks-listeners-to-hack-its-algorithm.html'
    }
  }
}
 */
