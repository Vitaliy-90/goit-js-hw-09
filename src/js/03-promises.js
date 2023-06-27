//  Імпорт бібліотеки і функції
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createPromise } from './functions';

// Створення перемінних

const form = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputStep = document.querySelector('[name="step"]');
const nameAmount = document.querySelector('[name="amount"]');

form.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();

  let position = 0;
  let delay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(nameAmount.value);

  for (let i = 0; i < amount; i += 1) {
    position += 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  form.reset();
}
