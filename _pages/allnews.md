---
title: "News"
layout: textlay
excerpt: "BAPOR Lab"
sitemap: false
permalink: /allnews.html
---

# News

{% for article in site.data.news %}

<p class="news-date"> {{ article.date }} </p>

{{ article.headline | replace: "<br>", " " | markdownify }}

{% endfor %}
