[![pages-build-deployment](https://github.com/baporlab/baporlab.github.io/actions/workflows/pages/pages-build-deployment/badge.svg?branch=master)](https://github.com/baporlab/baporlab.github.io/actions/workflows/pages/pages-build-deployment)

## Setup

``` bash
brew install ruby
gem install bundler jekyll
```

Clone this repository, then install the dependencies:

``` bash
bundle install
```

## Run

Run the local webserver with:

``` bash
bundle exec jekyll serve
```

## Contribute

### Add a new member

New members are stored as markdown files under
[_pages/team/_posts](_pages/team/_posts).

Each new member `.md` file must look like this:

``` yaml
---
layout: member
category: professor
title: 김성훈
image: sunghoon.png
role: Team Director
permalink: 'team/sunghoon'
social:
    twitter: https://twitter.com/
    linkedin: https://www.linkedin.com/
    google-scholar: https://scholar.google.fr/
    github: https://github.com/
    website:
    orcid: https://orcid.org/
    research-gate: https://www.researchgate.net/
education:
 - Education
---
Bio
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
```

### Add a new publication

Publications are stored as `.yaml` file under
[_data/publications.yaml](_data/publications.yaml).
This yaml file is exported from [Zotero](https://www.zotero.org/)
bibliography tool.

Just add a new entry to the list like this:

```yaml
- id: doi:10.1038/s41598-024-59362-3
  title: 'Correlations between heart sound components and hemodynamic variables'
  authors:
  - Yong-Seok Park
  - Hyun-Seok Kim
  - Seung-Ah Lee
  - Gyu-Sam Hwang
  - Woosuk Jung
  - Baehun Moon
  - Kyu-Min Kang
  - Woo-Young Seo
  - Jun-Gol Song
  - Sung-Hoon Kim
  publisher: Scientific Reports
  date: '2024-04-13'
  link: https://doi.org/10.1038/s41598-024-59362-3
```

### Add news

News are stored as `.yml` file under [_data/news.yml](_data/news.yml).

An entry looks like the following:

```yaml
- date: "2024.04.03"
  headline: |
    <a href="https://www.nature.com/articles/s41598-024-59362-3">
      'Correlations between heart sound components and hemodynamic variables'
    </a>
    논문 'Scientific Reports'에 게재
  tags:
    - Publication
```

### Edit template

We use [Bootstrap](https://getbootstrap.com/) for designing the website.
Feel free to modify either the [_pages](_pages/) or the
[_layouts](_layouts/) components.


# Research lab website template
This website is built with [Jekyll](https://jekyllrb.com/).
It is derived from the great template originally created by the
[Allan Lab](https://www.allanlab.org/aboutwebsite.html), at Leiden University and
subsequently modified by [ericdaat](https://github.com/ericdaat/research-lab-website)
