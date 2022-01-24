import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix'
import { fetchCountries } from './js/fetchCountries'
import { renderCountrysList, renderCountryInfo  } from './js/renderHtml'


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
        
          console.log(countries);
          
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';

      if (countries.length === 1) {
          // refs.countryList.insertAdjacentHTML('beforeend', renderCountrysList(countries));
          //   refs.countryList.classList.add('big-name');
          refs.countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
        
      } else if (countries.length >= 10) {
        alertTooManyMatches()
      } else {
          refs.countryList.insertAdjacentHTML('beforeend', renderCountrysList(countries));
          // refs.countryList.classList.remove('big-name');
      }
    })
    .catch(alertWrongName)
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name!')
}

function alertTooManyMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}
