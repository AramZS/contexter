var htmlPage = `
<!DOCTYPE html>
<html>

  <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>How to make your Jekyll site show up on social</title>
  <meta name="description" content="Here's how to make Jekyll posts easier for others to see and share on social networks.">

  <link rel="stylesheet" href="/css/main.css">

  <link rel="canonical" href="http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html">

  <link rel="alternate" type="application/rss+xml" title="Fight With Tools by AramZS" href="http://aramzs.github.io/feed.xml">

  <meta name="author" content="Aram Zucker-Scharff" />

  <meta property="og:title" content="How to make your Jekyll site show up on social">
  <meta property="og:site_name" content="Fight With Tools by AramZS" />
  <meta property="og:description" content="Here's how to make Jekyll posts easier for others to see and share on social networks.">
  <meta property="og:url" content="http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:site" content="@chronotope" />
  <meta name="twitter:description" content="Here's how to make Jekyll posts easier for others to see and share on social networks." />


  	<!-- Article specific OG data -->
  	<meta property="og:type" content="article" />
  	<meta property="article:published_time" content="2015-11-11 10:34:51 -0500" />

  	<meta property="article:author" content="http://facebook.com/aramzs" />
    <meta property="article:publisher" content="https://www.facebook.com/aramzs" />
  	<meta property="article:section" content="Code" />

  		<meta property="article:tag" content="jekyll" />

  		<meta property="article:tag" content="social-media" />

	<meta name="keywords" content="jekyll, social-media" />

  	<meta name="twitter:card" content="summary_large_image" />
  	<meta name="twitter:creator" content="@chronotope" />
  	<meta name="twitter:title" content="How to make your Jekyll site show up on social" />

	  	<meta property="og:image" content="https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/tumblr_nwncf1T2ht1rl195mo1_1280.jpg" />
	  	<meta name="twitter:image" content="https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/tumblr_nwncf1T2ht1rl195mo1_1280.jpg" />



		<script type="application/ld+json">
    {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "headline": "How to make your Jekyll site show up on social",
        "description": "Here's how to make Jekyll posts easier for others to see and share on social networks.",
        "image": [

                "https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/tumblr_nwncf1T2ht1rl195mo1_1280.jpg"

        ],
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "http://aramzs.github.io/jekyll/social-media/2015/11/11/be-social-with-jekyll.html"
        },
        "datePublished": "2015-11-11 10:34:51 -0500",
        "dateModified": "2015-11-11 10:34:51 -0500",
        "isAccessibleForFree": "True",

        "isPartOf": {
            "@type": ["CreativeWork", "Product", "Blog"],
            "name": "Fight With Tools",
            "productID": "aramzs.github.io"
        },
        "license": "http://creativecommons.org/licenses/by-sa/4.0/",
        "author": {
            "@type": "Person",
            "name": "Aram Zucker-Scharff",
            "description": "Aram Zucker-Scharff is Director for Ad Engineering at Washington Post, lead dev for PressForward and a consultant. Tech solutions for journo problems.",
            "sameAs": "http://aramzs.github.io/aramzs/",
            "image": {
                "@type": "ImageObject",
                "url": "https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/Aram-Zucker-Scharff-square.jpg"
            },
            "givenName": "Aram",
            "familyName": "Zucker-Scharff",
            "alternateName": "AramZS",
            "publishingPrinciples": "http://aramzs.github.io/about/"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Fight With Tools",
            "description": "A site discussing how to imagine, build, analyze and use cool code and web tools. Better websites, better stories, better developers. Technology won't save the world, but you can.",
            "sameAs": "http://aramzs.github.io",
            "logo": {
                "@type": "ImageObject",
                "url": "https://41.media.tumblr.com/709bb3c371b9924add351bfe3386e946/tumblr_nxdq8uFdx81qzocgko1_1280.jpg"
            },
            "publishingPrinciples": "http://aramzs.github.io/about/"
        }
    }
</script>





  	<link rel="icon" type="image/png" href="https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/favicon.ico">
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-87149202-1', 'auto');
	ga('set', 'anonymizeIp', true);
	ga('send', 'pageview');
	</script>
</head>


  <body class=" post ">

    <header class="site-header">

  <div class="wrapper">

    <a class="site-title" href="/">Fight With Tools by AramZS</a>

    <nav class="site-nav">
      <a href="#" class="menu-icon">
        <svg viewBox="0 0 18 15">
          <path fill="#424242" d="M18,1.484c0,0.82-0.665,1.484-1.484,1.484H1.484C0.665,2.969,0,2.304,0,1.484l0,0C0,0.665,0.665,0,1.484,0 h15.031C17.335,0,18,0.665,18,1.484L18,1.484z"/>
          <path fill="#424242" d="M18,7.516C18,8.335,17.335,9,16.516,9H1.484C0.665,9,0,8.335,0,7.516l0,0c0-0.82,0.665-1.484,1.484-1.484 h15.031C17.335,6.031,18,6.696,18,7.516L18,7.516z"/>
          <path fill="#424242" d="M18,13.516C18,14.335,17.335,15,16.516,15H1.484C0.665,15,0,14.335,0,13.516l0,0 c0-0.82,0.665-1.484,1.484-1.484h15.031C17.335,12.031,18,12.696,18,13.516L18,13.516z"/>
        </svg>
      </a>

      <div class="trigger">


          <a class="page-link" href="/about/">About</a>









          <a class="page-link" href="/aramzs/">Who is Aram?</a>




      </div>
    </nav>

  </div>

</header>


    <div class="page-content">
      <div class="wrapper">
        <article class="post single post-with-image" itemscope itemtype="http://schema.org/BlogPosting">
  <div itemprop="mainEntityOfPage">
    <header class="post-header">
      <div class="header-sub-box">
        <div class="title-box">
          <h1 class="post-title" itemprop="name headline">How to make your Jekyll site show up on social</h1>
        </div>

        <div class="post-image ">
          <img itemprop="image" alt="How to make your Jekyll site show up on social" src="https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/tumblr_nwncf1T2ht1rl195mo1_1280.jpg" />
        </div>

    </div>
      <p class="post-meta">
        <time datetime="2015-11-11T10:34:51-05:00" itemprop="datePublished">Nov 11, 2015</time><time datetime="2015-11-11T10:34:51-05:00" itemprop="dateModified"  style="display:none;" >2015-11-11 10:34:51 -0500</time> • By
        <span itemprop="author" itemscope itemtype="http://schema.org/Person">

          <span itemprop="name">Aram Zucker-Scharff</span>
        </span>
        <span itemprop="publisher" style="display:none;" itemscope itemtype="http://schema.org/Organization">
          <span itemprop="name">Fight With Tools</span>
          <span itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
            <img itemprop="url" src="https://raw.githubusercontent.com/AramZS/aramzs.github.io/master/_includes/favicon.ico" />
          </span>
        </span>
      </p>
    </header>

    <div class="post-content" itemprop="articleBody">
      <p>Congratulations, you’ve set up a Jekyll site. You may even be, like me, taking advantage of the free hosting provided by GitHub. You’ve written your first post, you’ve set up all the options. But when you go to share it on Facebook, Tumblr, LinkedIn or Twitter, that share may not look so pretty.</p>

<p>Here’s how to make Jekyll posts easier for others to see and share on social networks.</p>

<p>To fix ugly shares and be the envy of all your GitHub followers you’ll have to add some metadata to the HTML <code class="language-plaintext highlighter-rouge">HEAD</code> tag. Following is a walk-through of what tags and Liquid code is needed to generate those tags. Unless otherwise indicated, this markup goes in the <code class="language-plaintext highlighter-rouge">head.html</code> file in your <code class="language-plaintext highlighter-rouge">_includes</code> folder. If you’re not already familiar with social and open graph tags, this post should be a useful illustration of how they work.</p>

<p>First, there are standard tags that should be applied on every page.</p>

<figure class="highlight"><pre><code class="language-html" data-lang="html"><span class="c">&lt;!-- The Author meta propagates the byline in a number of social networks --&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"author"</span> <span class="na">content=</span><span class="s">"Aram Zucker-Scharff"</span> <span class="nt">/&gt;</span></code></pre></figure>

<p>The <code class="language-plaintext highlighter-rouge">og:title</code> tag sets the title for sharing. I’ve duplicated the logic of the title tag to show either the site title or the post title based on what location the user has loaded. You could set a post-level variable for custom title as well or change the number of allowed characters.</p>

<p>We’ll do the same with duplicating the logic of the <code class="language-plaintext highlighter-rouge">description</code> to <code class="language-plaintext highlighter-rouge">og:description</code> and <code class="language-plaintext highlighter-rouge">canonical</code> to <code class="language-plaintext highlighter-rouge">og:url</code> tags.</p>

<p>I’ve made the below Liquid statements multi-line for easier reading, but I wouldn’t recommend that in production.</p>

<figure class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"og:title"</span>
    <span class="na">content=</span><span class="s">"{% if page.title %}
      {{ page.title | strip_html | strip_newlines | truncate: 160 }}
    {% else %}
      {{ site.title }}
    {% endif %}"</span><span class="nt">&gt;</span>

<span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"og:description"</span>
    <span class="na">content=</span><span class="s">"{% if page.excerpt %}
        {{ page.excerpt | strip_html | strip_newlines | truncate: 160 }}
      {% else %}
        {{ site.description }}
      {% endif %}"</span><span class="nt">&gt;</span>


<span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"og:url"</span>
    <span class="na">content=</span><span class="s">"{{ page.url | replace:'index.html','' | prepend: site.baseurl | prepend: site.url }}"</span> <span class="nt">/&gt;</span>

  </code></pre></figure>

<p>Populating the Open Graph site name and locale tags is fairly straightforward.</p>

<figure class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"og:site_name"</span> <span class="na">content=</span><span class="s">"{{ site.title }}"</span> <span class="nt">/&gt;</span>

<span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"og:locale"</span> <span class="na">content=</span><span class="s">"en_US"</span> <span class="nt">/&gt;</span>

  </code></pre></figure>

<p>These are the site-wide Twitter tags. My <code class="language-plaintext highlighter-rouge">twitter:site</code> property is set to my personal name, but you might want to set it to your site’s account, if you have one. Description is set to the same data as the other description tags.</p>

<figure class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"twitter:site"</span> <span class="na">content=</span><span class="s">"@chronotope"</span> <span class="nt">/&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"twitter:description"</span> <span class="na">content=</span><span class="s">"{% if page.excerpt %}{{ page.excerpt | strip_html | strip_newlines | truncate: 160 }}{% else %}{{ site.description }}{% endif %}"</span> <span class="nt">/&gt;</span>

  </code></pre></figure>

<p>To populate all the fields social networks expect, you’ll need some extra properties on your posts. Here’s what the head of this post’s markdown file looks like.</p>

<figure class="highlight"><pre><code class="language-html" data-lang="html">---
layout: post
title:  "How to make your Jekyll site more shareable"
date:   2015-10-29 01:34:51 -0400
categories: jekyll social-media
image: http://41.media.tumblr.com/173cb5c51a1c308ab022a786f69353f3/tumblr_nwncf1T2ht1rl195mo1_1280.jpg
vertical: Code
excerpt: "Jekyll is pretty cool, here's how to make writing with it easier for others to share on social networks."
---</code></pre></figure>

<p>There are a number of meta tags that are either site or article only. In order to figure out if we’re on an article or not Liquid can switch in an if/else statement on the page.title.</p>

<figure class="highlight"><pre><code class="language-html" data-lang="html">{% if page.title %}
  <span class="c">&lt;!-- Article specific OG data --&gt;</span>
  <span class="c">&lt;!-- The OG:Type dictates a number of other tags on posts. --&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"og:type"</span> <span class="na">content=</span><span class="s">"article"</span> <span class="nt">/&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"article:published_time"</span> <span class="na">content=</span><span class="s">"{{page.date}}"</span> <span class="nt">/&gt;</span>

  <span class="c">&lt;!-- page.modified isn't a natural Jekyll property, but it can be added. --&gt;</span>
  {% if page.modified %}
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"article:modified_time"</span> <span class="na">content=</span><span class="s">"{{page.modified}}"</span> <span class="nt">/&gt;</span>
  {% endif %}

  <span class="c">&lt;!-- Here my author and publisher tags are the same (yay self-publishing) --&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"article:author"</span> <span class="na">content=</span><span class="s">"http://facebook.com/aramzs"</span> <span class="nt">/&gt;</span>
  <span class="c">&lt;!-- But if your site has its own page, this is where to put it. --&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"article:publisher"</span> <span class="na">content=</span><span class="s">"https://www.facebook.com/aramzs"</span> <span class="nt">/&gt;</span>

  <span class="c">&lt;!-- Article section isn't a required property, but it can be good to have --&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"article:section"</span> <span class="na">content=</span><span class="s">"{{page.vertical}}"</span> <span class="nt">/&gt;</span>

  <span class="c">&lt;!-- I use the page.categories property for OG tags. --&gt;</span>
  {% for tag in page.categories %}
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"article:tag"</span> <span class="na">content=</span><span class="s">"{{tag}}"</span> <span class="nt">/&gt;</span>
  {% endfor %}

  <span class="c">&lt;!-- I prefer the summary_large_image Twitter card for posts. --&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"twitter:card"</span> <span class="na">content=</span><span class="s">"summary_large_image"</span> <span class="nt">/&gt;</span>
  <span class="c">&lt;!-- You, you're the creator. --&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"twitter:creator"</span> <span class="na">content=</span><span class="s">"@chronotope"</span> <span class="nt">/&gt;</span>
  <span class="c">&lt;!-- This property is for the article title, not site title. --&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"twitter:title"</span> <span class="na">content=</span><span class="s">"{{page.title}}"</span> <span class="nt">/&gt;</span>

  </code></pre></figure>

<p>Sharing works better with pictures. You can upload them to your repository, or link them from other locations. Not every page may have an image, so I’ve built a check to assure that an image has been supplied. If one hasn’t, it returns to the default image I have for the whole site.</p>

<p>This takes care of both the Open Graph and Twitter Image tags. With more page properties you could have custom images for each if you wanted.</p>

<figure class="highlight"><pre><code class="language-html" data-lang="html">  {% if page.image %}
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"og:image"</span> <span class="na">content=</span><span class="s">"{{page.image}}"</span> <span class="nt">/&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"twitter:image"</span> <span class="na">content=</span><span class="s">"{{page.image}}"</span> <span class="nt">/&gt;</span>
  {% else %}
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"og:image"</span> <span class="na">content=</span><span class="s">"https://41.media.tumblr.com/709bb3c371b9924add351bfe3386e946/tumblr_nxdq8uFdx81qzocgko1_1280.jpg"</span> <span class="nt">/&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"twitter:image"</span> <span class="na">content=</span><span class="s">"https://41.media.tumblr.com/709bb3c371b9924add351bfe3386e946/tumblr_nxdq8uFdx81qzocgko1_1280.jpg"</span> <span class="nt">/&gt;</span>
  {% endif %}

  </code></pre></figure>

<p>What if you’re not on a post page? There are some default values we can fill in to indicate that we’re on the basic website.</p>

<figure class="highlight"><pre><code class="language-html" data-lang="html">{% else %}
  <span class="c">&lt;!-- OG data for homepage --&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"og:image"</span> <span class="na">content=</span><span class="s">"https://41.media.tumblr.com/709bb3c371b9924add351bfe3386e946/tumblr_nxdq8uFdx81qzocgko1_1280.jpg"</span> <span class="nt">/&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">"og:type"</span> <span class="na">content=</span><span class="s">"website"</span> <span class="nt">/&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"twitter:card"</span> <span class="na">content=</span><span class="s">"summary"</span> <span class="nt">/&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"twitter:title"</span> <span class="na">content=</span><span class="s">"{{site.title}}"</span> <span class="nt">/&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">"twitter:image"</span> <span class="na">content=</span><span class="s">"https://41.media.tumblr.com/709bb3c371b9924add351bfe3386e946/tumblr_nxdq8uFdx81qzocgko1_1280.jpg"</span> <span class="nt">/&gt;</span>

{% endif %}

  </code></pre></figure>

<p>That’s all of them! If you’re interested, you can see the whole set of tags, the Liquid script, and the rest of <code class="language-plaintext highlighter-rouge">head.html</code> that I use for this very site by <a href="https://github.com/AramZS/aramzs.github.io/blob/master/_includes/head.html">checking the repo</a>.</p>



      <br /><br />
      <em>This post is specifically my own thoughts & not representative of my employers past or present.</em>


    </div>
  </div>
</article>

      </div>
    </div>

    <footer class="site-footer">

  <div class="wrapper">

    <h2 class="footer-heading">Fight With Tools by AramZS</h2>

    <div class="footer-col-wrapper">
      <div class="footer-col footer-col-1">
        <ul class="contact-list">
          <li>Fight With Tools by AramZS</li>
          <li><a href="mailto:aramzs@hacktext.com">aramzs@hacktext.com</a></li>
        </ul>
      </div>

      <div class="footer-col footer-col-2">
        <ul class="social-media-list">

          <li>
            <a href="https://github.com/aramzs"><span class="icon icon--github"><svg viewBox="0 0 16 16"><path fill="#828282" d="M7.999,0.431c-4.285,0-7.76,3.474-7.76,7.761 c0,3.428,2.223,6.337,5.307,7.363c0.388,0.071,0.53-0.168,0.53-0.374c0-0.184-0.007-0.672-0.01-1.32 c-2.159,0.469-2.614-1.04-2.614-1.04c-0.353-0.896-0.862-1.135-0.862-1.135c-0.705-0.481,0.053-0.472,0.053-0.472 c0.779,0.055,1.189,0.8,1.189,0.8c0.692,1.186,1.816,0.843,2.258,0.645c0.071-0.502,0.271-0.843,0.493-1.037 C4.86,11.425,3.049,10.76,3.049,7.786c0-0.847,0.302-1.54,0.799-2.082C3.768,5.507,3.501,4.718,3.924,3.65 c0,0,0.652-0.209,2.134,0.796C6.677,4.273,7.34,4.187,8,4.184c0.659,0.003,1.323,0.089,1.943,0.261 c1.482-1.004,2.132-0.796,2.132-0.796c0.423,1.068,0.157,1.857,0.077,2.054c0.497,0.542,0.798,1.235,0.798,2.082 c0,2.981-1.814,3.637-3.543,3.829c0.279,0.24,0.527,0.713,0.527,1.437c0,1.037-0.01,1.874-0.01,2.129 c0,0.208,0.14,0.449,0.534,0.373c3.081-1.028,5.302-3.935,5.302-7.362C15.76,3.906,12.285,0.431,7.999,0.431z"/></svg>
</span><span class="username">aramzs</span></a>

          </li>



          <li>
            <a href="https://twitter.com/Chronotope"><span class="icon icon--twitter"><svg viewBox="0 0 16 16"><path fill="#828282" d="M15.969,3.058c-0.586,0.26-1.217,0.436-1.878,0.515c0.675-0.405,1.194-1.045,1.438-1.809c-0.632,0.375-1.332,0.647-2.076,0.793c-0.596-0.636-1.446-1.033-2.387-1.033c-1.806,0-3.27,1.464-3.27,3.27 c0,0.256,0.029,0.506,0.085,0.745C5.163,5.404,2.753,4.102,1.14,2.124C0.859,2.607,0.698,3.168,0.698,3.767 c0,1.134,0.577,2.135,1.455,2.722C1.616,6.472,1.112,6.325,0.671,6.08c0,0.014,0,0.027,0,0.041c0,1.584,1.127,2.906,2.623,3.206 C3.02,9.402,2.731,9.442,2.433,9.442c-0.211,0-0.416-0.021-0.615-0.059c0.416,1.299,1.624,2.245,3.055,2.271 c-1.119,0.877-2.529,1.4-4.061,1.4c-0.264,0-0.524-0.015-0.78-0.046c1.447,0.928,3.166,1.469,5.013,1.469 c6.015,0,9.304-4.983,9.304-9.304c0-0.142-0.003-0.283-0.009-0.423C14.976,4.29,15.531,3.714,15.969,3.058z"/></svg>
</span><span class="username">Chronotope</span></a>

          </li>

        </ul>
      </div>

      <div class="footer-col footer-col-3">
        <p>A site discussing how to imagine, build, analyze and use cool code and web tools. Better websites, better stories, better developers. Technology won't save the world, but you can.
</p>
      </div>
    </div>

  </div>

</footer>


  </body>

</html>
`;
module.exports = htmlPage;
