// Функція для конвертації  часу

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//

function formatTime(time) {
  return String(time).padStart(2, '0');
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  const formatDay = formatTime(days);
  const formatHour = formatTime(hours);
  const formatMinutes = formatTime(minutes);
  const formatSecond = formatTime(seconds);

  return { formatDay, formatHour, formatMinutes, formatSecond };
}

export { convertMs, addLeadingZero, formatTime };
