import { select, templates } from '../settings.js';
import AmountWidget from './AmountWidget.js';

class Booking {
  constructor(element) {
    const thisBooking = this;
    thisBooking.render(element);
    thisBooking.initWidgets();
  }

  render(element) {
    const thisBooking = this;
    thisBooking.element = element;

    thisBooking.dom = {
      wrapper: thisBooking.element,
    };

    /* generate HTML based on template */
    const generatedHTML = templates.bookingWidget();

    /* change wrapper content to generatedHTML */
    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = thisBooking.element.querySelector(
      select.booking.peopleAmount
    );
    thisBooking.dom.hoursAmount = thisBooking.element.querySelector(
      select.booking.hoursAmount
    );
  }

  initWidgets() {
    const thisBooking = this;
    console.log('thisbookingdom', thisBooking.dom);
    thisBooking.AmountWidget = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.AmountWidget = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.dom.peopleAmount.addEventListener('click', function () {});
    thisBooking.dom.hoursAmount.addEventListener('click', function () {});
  }
}

export default Booking;
