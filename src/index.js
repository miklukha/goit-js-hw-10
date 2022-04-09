import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetch-countries';
import { renderCountriesList } from './js/render-countries-list';
import { renderOneCountry } from './js/render-one-country';
import { clearMarkup } from './js/clear-markup';
import { getRefs } from './js/gets-refs';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.input.addEventListener('input', debounce(onFillInput, DEBOUNCE_DELAY));

function onFillInput(e) {
  const inputText = e.target.value.trim();

  if (inputText === '') {
    clearMarkup(refs);
    return;
  }

  fetchCountries(inputText)
    .then(data => {
      if (data.length > 10) {
        clearMarkup(refs);
        Notify.info('Too many matches found. Please enter a more specific name');
        return;
      }

      if (data.length < 2) {
        renderOneCountry(data, refs);
        return;
      }

      renderCountriesList(data, refs);
    })
    .catch(() => {
      clearMarkup(refs);
      Notify.failure('Oops, there is no country with that name');
    });
}
