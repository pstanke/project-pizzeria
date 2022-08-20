class Carousel {
  constructor(element) {
    const thisCarousel = this;
    thisCarousel.render(element);
    thisCarousel.initPlugin();
  }

  render(element) {
    const thisCarousel = this;
    thisCarousel.element = element;
  }

  initPlugin() {
    const thisCarousel = this;
    // eslint-disable-next-line no-undef
    new Flickity(thisCarousel.element, {
      cellAlign: 'left',
      contain: true,
      autoPlay: true,
      wrapAround: true,
      prevNextButtons: false,
    });
  }
}
export default Carousel;
