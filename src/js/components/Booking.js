import { classNames, select, settings, templates } from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor(element) {
    const thisBooking = this;
    thisBooking.selectedTable = '';
    thisBooking.render(element);
    thisBooking.initWidgets();
    thisBooking.getData();
  }

  getData() {
    const thisBooking = this;

    const startDateParam =
      settings.db.dateStartParamKey +
      '=' +
      utils.dateToStr(thisBooking.DatePicker.minDate);
    const endDateparam =
      settings.db.dateEndParamKey +
      '=' +
      utils.dateToStr(thisBooking.DatePicker.maxDate);

    const params = {
      booking: [startDateParam, endDateparam],
      eventsCurrent: [settings.db.notRepeatParam, startDateParam, endDateparam],
      eventsRepeat: [settings.db.repeatParam, endDateparam],
    };
    // console.log('getData params', params);

    const urls = {
      booking:
        settings.db.url +
        '/' +
        settings.db.bookings +
        '?' +
        params.booking.join('&'),
      eventsCurrent:
        settings.db.url +
        '/' +
        settings.db.events +
        '?' +
        params.eventsCurrent.join('&'),
      eventsRepeat:
        settings.db.url +
        '/' +
        settings.db.events +
        '?' +
        params.eventsRepeat.join('&'),
    };
    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])

      .then(function (allResponses) {
        const bookingsResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function ([bookings, eventsCurrent, eventsRepeat]) {
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }

  parseData(bookings, eventsCurrent, eventsRepeat) {
    const thisBooking = this;

    thisBooking.booked = {};

    for (let item of bookings) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }
    for (let item of eventsCurrent) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate = thisBooking.DatePicker.minDate;
    const maxDate = thisBooking.DatePicker.maxDate;

    for (let item of eventsRepeat) {
      if (item.repeat == 'daily') {
        for (
          let loopDate = minDate;
          loopDate <= maxDate;
          loopDate = utils.addDays(loopDate, 1)
        ) {
          thisBooking.makeBooked(
            utils.dateToStr(loopDate),
            item.hour,
            item.duration,
            item.table
          );
        }
      }
    }
    thisBooking.updateDom();
  }

  makeBooked(date, hour, duration, table) {
    const thisBooking = this;

    if (typeof thisBooking.booked[date] == 'undefined') {
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    for (
      let hourBlock = startHour;
      hourBlock < startHour + duration;
      hourBlock += 0.5
    ) {
      if (typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }
      thisBooking.booked[date][hourBlock].push(table);
    }
  }

  updateDom() {
    const thisBooking = this;

    thisBooking.date = thisBooking.DatePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.HourPicker.value);

    let allAvailable = false;

    if (
      typeof thisBooking.booked[thisBooking.date] == 'undefined' ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] ==
        'undefined'
    ) {
      allAvailable = true;
    }

    for (let table of thisBooking.dom.tables) {
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      table.classList.remove(classNames.booking.tableSelected);
      thisBooking.selectedTable = '';
      if (!isNaN(tableId)) {
        tableId = parseInt(tableId);
      }

      if (
        !allAvailable &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ) {
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
  }

  initTables(event) {
    const clickedElement = event.target;
    const thisBooking = this;
    thisBooking.selectedTable = '';

    if (clickedElement.classList.contains('table')) {
      if (clickedElement.classList.contains(classNames.booking.tableBooked)) {
        alert('This table is already booked');
        return;
      }
      if (
        !clickedElement.classList.contains(classNames.booking.tableSelected)
      ) {
        for (let table of thisBooking.dom.tables) {
          /* remove class selected from all tables */
          table.classList.remove(classNames.booking.tableSelected);
          /* remove id from thisBooking.selectedTable*/
          thisBooking.selectedTable = '';
          /* add class selected to event.target */
          clickedElement.classList.add(classNames.booking.tableSelected);
          /* get id attribute from event.target */
          const selectedTableId = clickedElement.getAttribute('data-table');
          /* add id to thisBooking.selectedTable */
          thisBooking.selectedTable += selectedTableId;
          console.log(thisBooking.selectedTable);
        }
      } else {
        /* thisBooking.selectedTable equals id attribute from event.target */
        thisBooking.selectedTable = clickedElement.getAttribute('data-table');
        /* remove class selected from event.target */
        clickedElement.classList.remove(classNames.booking.tableSelected);
        /* remove id from thisBooking.selectedTable*/
        thisBooking.selectedTable = '';
      }
    }
    // console.log('thisBooking.selectedTable', thisBooking.selectedTable);
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
    thisBooking.dom.HourPicker = thisBooking.element.querySelector(
      select.widgets.hourPicker.wrapper
    );
    thisBooking.dom.tables = thisBooking.element.querySelectorAll(
      select.booking.tables
    );
    thisBooking.dom.floor = thisBooking.element.querySelector(
      select.containerOf.floor
    );
    thisBooking.dom.form = thisBooking.element.querySelector(
      select.booking.form
    );
    thisBooking.phone = thisBooking.element.querySelector(select.booking.phone);
    thisBooking.address = thisBooking.element.querySelector(
      select.booking.address
    );
    thisBooking.starters = thisBooking.element.querySelectorAll(
      select.booking.checkbox
    );
  }

  sendOrder() {
    const thisBooking = this;

    const url = settings.db.url + '/' + settings.db.bookings;

    const payload = {
      date: thisBooking.DatePicker.value,
      hour: thisBooking.HourPicker.value,
      table: parseInt(thisBooking.selectedTable) || null,
      duration: parseInt(thisBooking.hoursAmount.value),
      ppl: parseInt(thisBooking.peopleAmount.value),
      starters: [],
      address: thisBooking.address.value,
      phone: thisBooking.phone.value,
    };
    for (let starter of thisBooking.starters) {
      if (starter.checked) {
        if (starter.value == 'water') {
          payload.starters.push(starter.value);
        } else {
          payload.starters.splice(starter.value);
        }
        if (starter.value == 'bread') {
          for (let starter of thisBooking.starters) {
            payload.starters.push(starter.value);
          }
        }
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (parsedResponse) {
        thisBooking.makeBooked(
          parsedResponse.date,
          parsedResponse.hour,
          parsedResponse.duration,
          parsedResponse.table
        );
        // console.log('parsedResponse', parsedResponse);
      });
    // console.log('payload', payload);
  }

  initWidgets() {
    const thisBooking = this;
    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.DatePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.HourPicker = new HourPicker(thisBooking.dom.HourPicker);
    thisBooking.dom.peopleAmount.addEventListener('click', function () {});
    thisBooking.dom.hoursAmount.addEventListener('click', function () {});

    thisBooking.dom.wrapper.addEventListener('updated', function () {
      thisBooking.updateDom();
    });
    thisBooking.dom.floor.addEventListener('click', function (event) {
      event.preventDefault();
      thisBooking.initTables(event);
    });
    thisBooking.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisBooking.sendOrder();
    });
  }
}

export default Booking;
