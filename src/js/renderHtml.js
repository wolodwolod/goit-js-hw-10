
export function renderCountrysList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 40px>
              <h3 class="country-list__name">${name.official}</h3>
          </li>
          `
    })
    .join('')
  return markup
};

export function renderCountryInfo(countries) {
  const markup = countries
    .map(({ name, flags, capital, population, languages }) => {
        return `
      <div class="country-list__item">
      <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 40px>
              <h1 class="country-list__name">${name.official}</h1>
              </div>
      
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