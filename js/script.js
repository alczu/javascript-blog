'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optArticleTagsSelector = '.post-tags .list',
  optTitleListSelector = '.titles';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const href = clickedElement.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(href);
  /* add class 'active' to the correct article */
  if (targetArticle) {
    targetArticle.classList.add('active');
  }
}

function generateTitleLinks() {
  console.log('Function generateTitleLinks was called');

  // Delete content of link list
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  // Find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  // generate links
  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const titleElement = article.querySelector(optTitleSelector);
    const articleTitle = titleElement.innerText;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html += linkHTML;
  }
  titleList.innerHTML = html;
  // Add event listener to newly generate links
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

// Start of generateTitleLinks function
generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll('.post');
  /* START LOOP: for every article: */
  articles.forEach(article => {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector('.post-tags');
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const tags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* for each tag */
    for(let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = `<a href="#tag-${tag}">${tag}</a>`;
      /* add generated code to html variable */
      html += linkHTML + ' ';
    };
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html.trim();
  });

  /* END LOOP: for every article: */
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  activeTags.forEach(activeTag => {
    /* remove class active */
    activeTag.classList.remove('active');
  });
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
const tagLinks = document.querySelectorAll('a[href="${href}"]');
  /* START LOOP: for each found tag link */
  tagLinks.forEach(tagLink => {
    /* add class active */
    tagLink.classList.add('active');
  });
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="${tag}"]')
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  tagLinks.forEach(tagLink => {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  });
  /* END LOOP: for each link */
}

addClickListenersToTags();