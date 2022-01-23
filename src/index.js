import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import { fetchCountries } from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
    
};

refs.searchBox.addEventListener('input', debounce(onSearchBox, DEBOUNCE_DELAY));

function onSearchBox() {
  const boxName = refs.searchBox.value.trim()
  if (boxName === '') {
      return (refs.countryList.innerHTML = ''),
             (refs.countryInfo.innerHTML = '')
    };

  fetchCountries(boxName)
    .then(countries => {
      refs.countryList.innerHTML = ''
      refs.countryInfo.innerHTML = ''
      if (countries.length === 1) {
          refs.countryList.insertAdjacentHTML('beforeend', renderCountrysList(countries));
            refs.countryList.classList.add('big-name');
          refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
        
      } else if (countries.length >= 10) {
        alertTooManyMatches()
      } else {
          refs.countryList.insertAdjacentHTML('beforeend', renderCountrysList(countries));
          refs.countryList.classList.remove('big-name');
      }
    })
    .catch(alertWrongName)
}

function renderCountrysList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 40px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `
    })
    .join('')
  return markup
}

function renderCountryInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
        </ul>
        `
    })
    .join('')
  return markup
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name!')
}

function alertTooManyMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}
