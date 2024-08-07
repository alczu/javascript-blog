'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloud: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
  authorList: Handlebars.compile(document.querySelector('#template-author-list').innerHTML)
}
const optArticleSelector = '.post';
const optArticleAuthorSelector = '.post-author';
const optTitleSelector = '.post-title';
const optArticleTagsSelector = '.post-tags .list';
const optTitleListSelector = '.titles';
const optTagsListSelector = '.tags.list';
const optAuthorsListSelector = '.list-authors';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const tagsParams = calculateTagsParams(allTags);

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const href = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(href);
  if (targetArticle) {
    targetArticle.classList.add('active');
  }
}

function generateTitleLinks(customSelector = '') {
  console.log('Function generateTitleLinks was called');
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const titleElement = article.querySelector(optTitleSelector);
    const articleTitle = titleElement.innerText;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    html += linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  activeTags.forEach(activeTag => {
    activeTag.classList.remove('active');
  });

  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);
  tagLinks.forEach(tagLink => {
    tagLink.classList.add('active');
  });

  generateTitleLinks(`[data-tags~="${tag}"]`);
}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  tagLinks.forEach(tagLink => {
    tagLink.addEventListener('click', tagClickHandler);
  });
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  const allAuthors = {};

  articles.forEach(article => {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute('data-author');
    const linkHTML = `<a href="#author-${author}">${author}</a>`;
    authorWrapper.innerHTML = linkHTML;

    if (!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  });

  const authorList = document.querySelector(optAuthorsListSelector);
  const allAuthorsData = { authors: [] };

  for (let author in allAuthors) {
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  }

  authorList.innerHTML = templates.authorList(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  activeAuthors.forEach(activeAuthor => {
    activeAuthor.classList.remove('active');
  });

  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);
  authorLinks.forEach(authorLink => {
    authorLink.classList.add('active');
  });

  generateTitleLinks(`[data-author="${author}"]`);
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  authorLinks.forEach(authorLink => {
    authorLink.addEventListener('click', authorClickHandler);
  });
}

addClickListenersToAuthors();

function generateTags() {
  let allTags = {};

  const articles = document.querySelectorAll('.post');

  for (let article of articles) {
    const tagsWrapper = article.querySelector('.post-tags .list');
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {
      const linkHTML = templates.tagLink({ tag });
      html += linkHTML;

      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    tagsWrapper.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);
  const allTagsData = { tags: [] };
  const tagsParams = calculateTagsParams(allTags);

  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  tagList.innerHTML = templates.tagCloud(allTagsData);
  addClickListenersToTags();
  console.log(calculateTagsParams(allTags));
}

generateTags();

function calculateTagsParams(tags) {
  const params = {
    min: 99999,
    max: 0
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}
