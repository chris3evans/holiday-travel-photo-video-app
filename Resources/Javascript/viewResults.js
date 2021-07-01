const countryEntry = document.querySelector('.country')
const resultsContainer = document.querySelector('.results--container')

export const renderCountryResults = function (countryData) {
    //Need to use data from state in a HTML feature we can render
    resultsContainer.innerHTML = '';
    countryData.forEach(function (country) {
        resultsContainer.insertAdjacentHTML('afterbegin', `
        <div class="country entry" data-id=${country.country}>
        <h2 class="country--name">${country.country}</h2>
        <div class="country--info">
         <p class="country--visited">Visited ${country.timesVisited} Times</p>
         <ul class="country--details">
           <li>
             <i class="ion-images country--details__photos"></i>58</li>
           <li>
             <i class="ion-film-marker country--details__videos"></i>12</li>
         </ul>
       </div>
       </div>
       `)
    })
}

let target

export const addHandlerLocationResults = function (subscriber) {
  resultsContainer.addEventListener('click', function (e) {
    target = e.target.closest('.country');
    subscriber();
  })
}

export const renderLocationResults = function (locationData) {
  resultsContainer.innerHTML = '';

    console.log(locationData);

    const selectedCountry = locationData.find(function (country) {
      return country.country === target.dataset.id;
    })
    console.log(selectedCountry);

    selectedCountry.locations.forEach(function (location) {
        resultsContainer.insertAdjacentHTML("afterbegin" , `<div class="location entry">
        <h2 class="location--name">${location.nameTag}</h2>

        <ul class="location--details">
          <li class="location--details__address">
            <i class="ion-location location--details__address-icon"></i>
            <p class="location--details__address-text">${location.locationAddress}</p>
          </li>
          <div class="location--info">
          <li class="location--detais__date0">
            <p class="location--details__date"><i class="ion-calendar location--details__date-icon"></i>${location.startDate} &mdash; ${location.endDate}</p>
          </li>
          <li class="location--details__media">
            <i class="ion-images location--details__media-icon"></i>14<i class="ion-film-marker location--details__media-icon"></i>6</li>
        </ul>
      </div>`)
    })
}

export const addHandlerPageLoad = function (subscriber) {
  window.addEventListener('load', subscriber)
}