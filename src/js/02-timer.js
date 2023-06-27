// Імпорт бібліотек

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Імпорт функцій

import { convertMs, addLeadingZero } from './functions';

// Перемінні
const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minValue = document.querySelector('[data-minutes]');
const secValue = document.querySelector('[data-seconds]');

const INTERVAL_TIME = 1000;
let timeId = null;
btnStart.setAttribute('disabled', true);

btnStart.addEventListener('click', onBtnClick);

// Перемінні для зберігання часу

let choisedDate = null;
let actualDate = null;
let finalDate = null;

// Опції бібліотеки Флет....

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choisedDate = selectedDates[0];
    actualDate = new Date();
    finalDate = choisedDate - actualDate;
    if (finalDate > 0) {
      Notify.success('You can start');
      btnStart.removeAttribute('disabled');
    } else {
      Notify.failure('Please enter date in future');
      btnStart.setAttribute('disabled', true);
    }
  },
};

// Ініціалізація Бібліотеки

flatpickr(inputDate, options);

function onBtnClick() {
  actualDate = new Date();
  finalDate = choisedDate - actualDate;
  if (finalDate > 0) {
    Notify.success('Lets Go');
    startTime();
    btnStart.setAttribute('disabled', true);
    inputDate.setAttribute('disabled', true);
  } else {
    Notify.failure('Please enter date in future');
    btnStart.setAttribute('disabled', true);
  }
}

function startTime() {
  timeChange(addLeadingZero(convertMs(finalDate)));
  timeId = setInterval(() => {
    finalDate -= INTERVAL_TIME;
    timeChange(addLeadingZero(convertMs(finalDate)));
    if (finalDate < INTERVAL_TIME) {
      clearInterval(timeId);
      Notify.success('time is over');
      btnStart.removeAttribute('disabled');
      inputDate.removeAttribute('disabled');
    }
  }, INTERVAL_TIME);
}

function timeChange({ formatDay, formatHour, formatMinutes, formatSecond }) {
  daysValue.textContent = formatDay;
  hoursValue.textContent = formatHour;
  minValue.textContent = formatMinutes;
  secValue.textContent = formatSecond;
}
