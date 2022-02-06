var chai = require("chai"),
	expect = chai.expect,
	assert = chai.assert,
	eventually = require("chai-as-promised"),
	should = chai.should();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

require("dotenv").config();

const linkModule = require("../src/link-block-maker");
const linkRequest = require("../src/link-request");

describe("The Link Block Maker Module", function () {
	describe("should create a block from a basic URL", function () {
		this.timeout(5000);
		let result = {};
		before(async () => {
			result = await linkRequest.getLinkData({
				sanitizedLink:
					"https://aramzs.github.io/jekyll/schema-dot-org/2018/04/27/how-to-make-your-jekyll-site-structured.html",
				link: "https://aramzs.github.io/jekyll/schema-dot-org/2018/04/27/how-to-make-your-jekyll-site-structured.html",
			});
		});
		it("should create a link block with data inside it", function () {
			const html = linkModule.createLinkBlock(result);
			const jsDom = new JSDOM(html);
			console.log(html);
			expect(jsDom).to.have.property("window");
			expect(
				jsDom.window.document.getElementsByTagName("img")[0].src
			).to.equal(
				"https://github.com/AramZS/aramzs.github.io/blob/master/_includes/beamdown.gif?raw=true"
			);
			expect(
				jsDom.window.document.getElementsByClassName("byline")[0]
					.textContent
			).to.equal("Aram Zucker-Scharff");
			expect(
				jsDom.window.document.getElementsByClassName("entry-title")[0]
					.textContent
			).to.equal(
				"\n\t\tHow to give your Jekyll Site Structured Data for Search with JSON-LD\n  \t"
			);
			jsDom.window.document
				.getElementsByClassName("entry-summary")[0]
				.textContent.should.equal(
					"\n\t\tLet's make your Jekyll site work with Schema.org structured data and JSON-LD.\n\t"
				);
			expect(
				jsDom.window.document.getElementsByClassName("p-category")[0]
					.textContent
			).to.equal("jekyll");
			expect(
				jsDom.window.document.getElementsByClassName("p-category")[1]
					.textContent
			).to.equal("schema-dot-org");
			expect(
				jsDom.window.document.getElementsByClassName("p-category")[2]
					.textContent
			).to.equal("Code");
		});
		it("should use oembed when available", async function () {
			result = await linkRequest.getLinkData({
				sanitizedLink:
					"https://www.flickr.com/photos/aramzs/33763840540/in/dateposted-public/",
				link: "https://www.flickr.com/photos/aramzs/33763840540/in/dateposted-public/",
			});
			const html = linkModule.createLinkBlock(result);
			html.should.equal(
				'<a data-flickr-embed="true" href="https://www.flickr.com/photos/aramzs/33763840540/" title="upload by AramZS, on Flickr"><img src="https://live.staticflickr.com/2941/33763840540_481ce97db2_z.jpg" width="640" height="640" alt="upload"></a><script async src="https://embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>'
			);
		});
	});
});

/**
 *
 * <article id="link-card h-entry hentry" itemscope itemtype="https://schema.org/CreativeWork">
    <div class="thumbnail">
      <img src="https://github.com/AramZS/aramzs.github.io/blob/master/_includes/beamdown.gif?raw=true" alt="" itemprop="image" />
    </div>
    <div>
      <header>

        <span class="p-name entry-title" itemprop="headline">
                <a href="" itemprop="url">How to give your Jekyll Site Structured Data for Search with JSON-LD</a>
        </span>
      </header>
                <div class="p-author author">
        <span class="p-name byline" rel="author" itemprop="author">Aram Zucker-Scharff</span>
  </div>
                <time class="dt-published published" itemprop="datePublished" datetime="2018-04-27T22:00:51.000Z">3 27, 2018</time>

        <summary class="p-summary entry-summary" itemprop="abstract">
                <p>Let's make your Jekyll site work with Schema.org structured data and JSON-LD.</p>
        </summary>

                <div itemprop="keywords">
                        <span rel="category tag" class="p-category" itemprop="keywords">jekyll</span>, <span rel="category tag" class="p-category" itemprop="keywords">schema-dot-org</span>, <span rel="category tag" class="p-category" itemprop="keywords">Code</span>
                </div>
      <div class="links">

        <a href="" target="_blank" class="read-link" itemprop="isBasedOn">Read</a>
      </div>
    </div>
</article>
 */
