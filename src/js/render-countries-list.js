export function renderCountriesList(data, refs) {
  refs.container.textContent = '';

  const markup = data
    .map(
      ({ flags, name }) => ` <li class="country-item">
        <img src="${flags.svg}" alt="${name.official}"  
          width="30px" height="20px" >
        <p class="country-text">${name.official}</p>
      </li>`,
    )
    .join('');

  refs.list.innerHTML = markup;
}
