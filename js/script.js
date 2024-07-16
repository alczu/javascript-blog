'use strict';

const optArticleSelector = '.post';
const optArticleAuthorSelector = '.post-author';
const optTitleSelector = '.post-title';
const optArticleTagsSelector = '.post-tags .list';
const optTitleListSelector = '.titles';
const optTagsListSelector = '.tags.list';

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
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html += linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);

  articles.forEach(article => {
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';
    const tags = article.getAttribute('data-tags');
    const articleTagsArray = tags.split(' ');

    for (let tag of articleTagsArray) {
      const linkHTML = `<a href="#tag-${tag}">${tag}</a>`;
      html += linkHTML + ' ';
    }

    tagsWrapper.innerHTML = html.trim();
  });
}

generateTags();

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

  articles.forEach(article => {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const author = article.getAttribute('data-author');
    const linkHTML = `<a href="#author-${author}">${author}</a>`;
    authorWrapper.innerHTML = linkHTML;
  });
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



function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */

  /* START LOOP: for every article: */

    /* find tags wrapper */

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
}
