import { select, templates } from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
// import HourPicker from './HourPicker.js';

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
    thisBooking.dom.datePicker = thisBooking.element.querySelector(
      select.widgets.datePicker.wrapper
    );
    // thisBooking.dom.hourPicker = thisBooking.element.querySelector(
    //   select.widgets.hourPicker.wrapper
    // );
  }

  initWidgets() {
    const thisBooking = this;
    thisBooking.AmountWidget = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.AmountWidget = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.DatePicker = new DatePicker(thisBooking.dom.datePicker);
    // thisBooking.HourPicker = new HourPicker(thisBooking.dom.hourPicker);
    thisBooking.dom.peopleAmount.addEventListener('click', function () {});
    thisBooking.dom.hoursAmount.addEventListener('click', function () {});
  }
}

export default Booking;
