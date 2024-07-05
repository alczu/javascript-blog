'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
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
