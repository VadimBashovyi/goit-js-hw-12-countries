import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
import CardCountryEl from '../templates/coun-card.hbs';
import CardCountryListEL from '../templates/list-coun.hbs';
import refs from './refs.js';
const { cardCouformSeachCountryRef } = refs;
import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

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
        CreateRenderCountriCard(data);
      } else if (data.length <= 10) {
        CreateRenderCountryList(data);
      }
    })
    .catch(error => {
      Error({
        text: 'You must enter query parameters!',
      });
    });
}

function CreateRenderCountriCard(data) {
  const cardMarkup = CardCountryEl(data);
  refs.cardCountryRef.innerHTML = cardMarkup;
}

function CreateRenderCountryList(data) {
  const cardMarkup = CardCountryListEL(data);
  refs.cardCountryRef.innerHTML = cardMarkup;
}
function clearInput() {
  refs.formSeachCountryRef.textContent = '';
}

refs.formSeachCountryRef.addEventListener('input', debounce(onSearch, 1000));
