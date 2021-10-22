import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';
import refs from './refs.js';
const { cardInfo, searchForm } = refs;
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

refs.searchForm.addEventListener('input', debounce(onSearch, 1000));

/* -----------------------------функция инпута приносит данные ---------------------------- */

function onSearch(e) {
  e.preventDefault();
  let searchQuery = e.target.value;

  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      } else if (data.status === 404) {
        error({
          text: 'No countryhas been found.',
        });
      } else if (data.length === 1) {
        renderCountriCard(data);
      } else if (data.length <= 10) {
        renderCountryList(data);
      }
    })
    .catch(error => {
      Error({
        text: 'You must enter query parameters!',
      });
    });
}

/* ---------------------------- рендерит разметку --------------------------- */
function renderCountriCard(data) {
  const cardMarkup = countryCardTpl(data);
  refs.cardInfo.innerHTML = cardMarkup;
}

function renderCountryList(data) {
  const cardMarkup = countryListTpl(data);
  refs.cardInfo.innerHTML = cardMarkup;
}
/* ---------------------------- очистка инпута --------------------------- */
// function clearInput() {
//   refs.searchForm.textContent = '';
// }
// ================================================
