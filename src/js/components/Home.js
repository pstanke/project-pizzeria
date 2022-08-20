import { select, templates, classNames } from '../settings.js';
import Carousel from './Carousel.js';
class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
    thisHome.initWidgets();
  }
  render(element) {
    const thisHome = this;
    thisHome.element = element;

    thisHome.dom = {
      wrapper: thisHome.element,
    };
    /* generate HTML based on template */
    const generatedHTML = templates.Home();
    /* change wrapper content to generatedHTML */
    thisHome.dom.wrapper.innerHTML = generatedHTML;

    thisHome.dom.Carousel = thisHome.element.querySelector(
      select.home.carousel
    );
    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.homeLinks = document.querySelectorAll(select.nav.homeLinks);
    thisHome.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisHome.pages[0].id;

    for (let page of thisHome.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        // console.log(pageMatchingHash);
        break;
      }
    }
    thisHome.activatePage(pageMatchingHash);
    for (let link of thisHome.homeLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        /*  get page id from href attribute*/

        const id = clickedElement.getAttribute('href').replace('#', '');

        /* run thisApp.activatePage with that id */

        thisHome.activatePage(id);

        /* change URL hash*/

        window.location.hash = '#/' + id;
      });
    }
  }
  activatePage(pageId) {
    const thisHome = this;

    /* add class "active" to matching pages. remove from non-matching */

    for (let page of thisHome.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /* add class "active" to matching links. remove from non-matching */

    for (let link of thisHome.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  }
  initWidgets() {
    const thisHome = this;
    thisHome.Carousel = new Carousel(thisHome.dom.Carousel);
  }
}
export default Home;
