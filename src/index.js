import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  container: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onFillInput, DEBOUNCE_DELAY));

function onFillInput(e) {
  const inputText = e.target.value.trim();

  if (inputText === '') {
    console.log('empty field');
    return;
    // Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується, а розмітка списку країн або інформації про країну зникає.
  }

  fetchCountries(inputText)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
        return;
      }

      if (data.length < 2) {
        renderOneCard(data);
        return;
      }

      refs.container.innerHTML = renderCards(data);
    })
    .catch(Notify.failure('Oops, there is no country with that name'));
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  ).then(response => {
    if (!response.ok) {
      throw Error(response.status);
    }

    return response.json();
  });
}

function renderCards(data) {
  return data
    .map(
      ({ flags, name }) => ` <li>
  <img src="${flags.svg}" alt="${name.official}"  width="70px" height="30px" >
  <p>${name.official}</p>
</li>`,
    )
    .join('');
}

function renderOneCard(data) {
  const languages = Object.values(data[0].languages).join(', ');

  refs.container.innerHTML = `
<img src="${data[0].flags.svg}" alt="${data[0].name.official}"  width="70px" height="30px" >
  <p>${data[0].name.official}</p>
  <ul>
    <li>Capital: ${data[0].capital}</li>
    <li>Population: ${data[0].population}</li>
    <li>Languages: ${languages}</li>
  </ul>`;
}
