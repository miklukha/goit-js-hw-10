export function renderOneCountry(data, refs) {
  const { name, flags, capital, population } = data[0];
  const languages = Object.values(data[0].languages).join(', ');

  refs.list.textContent = '';

  refs.container.innerHTML = `<div class="country-wrapper">
    <img src="${flags.svg}" alt="${name.official}"
      width="30px" height="20px" />
    <p class="country-name">${name.official}</p>
  </div>
  <ul>
    <li class="country-item">
      <span class="country-category">Capital:</span>&nbsp; ${capital}
    </li>
    <li class="country-item">
      <span class="country-category">Population:</span>&nbsp;${population}
    </li>
    <li class="country-item">
      <span class="country-category">Languages:</span>&nbsp; ${languages}
    </li>
  </ul>`;
}
