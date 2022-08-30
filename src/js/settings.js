export const select = {
  templateOf: {
    home: '#template-home', // CODE ADDED
    menuProduct: '#template-menu-product',
    cartProduct: '#template-cart-product', // CODE ADDED
    bookingWidget: '#template-booking-widget', // CODE ADDED
  },
  containerOf: {
    menu: '#product-list',
    cart: '#cart',
    pages: '#pages', // CODE ADDED
    booking: '.booking-wrapper', // CODE ADDED
    home: '.home-wrapper', // CODE ADDED
    floor: '.floor-plan',
  },
  all: {
    menuProducts: '#product-list > .product',
    menuProductsActive: '#product-list > .product.active',
    formInputs: 'input, select',
  },
  menuProduct: {
    clickable: '.product__header',
    form: '.product__order',
    priceElem: '.product__total-price .price',
    imageWrapper: '.product__images',
    amountWidget: '.widget-amount',
    cartButton: '[href="#add-to-cart"]',
  },
  widgets: {
    amount: {
      input: 'input.amount', // CODE CHANGED
      linkDecrease: 'a[href="#less"]',
      linkIncrease: 'a[href="#more"]',
    },
    datePicker: {
      wrapper: '.date-picker', // CODE ADDED
      input: `input[name="date"]`, // CODE ADDED
    },
    hourPicker: {
      wrapper: '.hour-picker', // CODE ADDED
      input: 'input[type="range"]', // CODE ADDED
      output: '.output', // CODE ADDED
    },
  },
  booking: {
    peopleAmount: '.people-amount', // CODE ADDED
    hoursAmount: '.hours-amount', // CODE ADDED
    tables: '.floor-plan .table', // CODE ADDED
    form: '.booking-form',
    // formSubmit: '.booking-form [type="submit"]',
    phone: '[name="phone"]',
    address: '[name="address"]',
    checkbox: '[name="starter"]',
  },
  home: {
    carousel: '.main-carousel',
  },
  nav: {
    links: '.main-nav a',
    homeLinks: '.home-nav',
    // CODE ADDED
  },
  // CODE ADDED START
  cart: {
    productList: '.cart__order-summary',
    toggleTrigger: '.cart__summary',
    totalNumber: `.cart__total-number`,
    totalPrice:
      '.cart__total-price strong, .cart__order-total .cart__order-price-sum strong',
    subtotalPrice: '.cart__order-subtotal .cart__order-price-sum strong',
    deliveryFee: '.cart__order-delivery .cart__order-price-sum strong',
    form: '.cart__order',
    formSubmit: '.cart__order [type="submit"]',
    phone: '[name="phone"]',
    address: '[name="address"]',
  },
  cartProduct: {
    amountWidget: '.widget-amount',
    price: '.cart__product-price',
    edit: '[href="#edit"]',
    remove: '[href="#remove"]',
  },
  // CODE ADDED END
};

export const classNames = {
  menuProduct: {
    wrapperActive: 'active',
    imageVisible: 'active',
  },
  // CODE ADDED START
  cart: {
    wrapperActive: 'active',
  },
  // CODE ADDED END
  // CODE ADDED START
  booking: {
    loading: 'loading',
    tableBooked: 'booked',
    tableSelected: 'selected',
  },
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
  // CODE ADDED END
};

export const settings = {
  amountWidget: {
    defaultValue: 1,
    defaultMin: 1,
    defaultMax: 10,
  }, // CODE CHANGED
  // CODE ADDED START
  cart: {
    defaultDeliveryFee: 20,
  },
  hours: {
    open: 12,
    close: 24,
  },
  datePicker: {
    maxDaysInFuture: 14,
  },
  booking: {
    tableIdAttribute: 'data-table',
  },
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    products: 'products',
    orders: 'orders',
    bookings: 'bookings',
    events: 'events',
    dateStartParamKey: 'date_gte',
    dateEndParamKey: 'date_lte',
    notRepeatParam: 'repeat=false',
    repeatParam: 'repeat_ne=false',
  },
  // CODE ADDED END
};

export const templates = {
  menuProduct: Handlebars.compile(
    document.querySelector(select.templateOf.menuProduct).innerHTML
  ),
  // CODE ADDED START
  cartProduct: Handlebars.compile(
    document.querySelector(select.templateOf.cartProduct).innerHTML
  ),
  // CODE ADDED END
  // CODE ADDED START
  bookingWidget: Handlebars.compile(
    document.querySelector(select.templateOf.bookingWidget).innerHTML
  ),
  Home: Handlebars.compile(
    document.querySelector(select.templateOf.home).innerHTML
  ),
  // CODE ADDED END
};
