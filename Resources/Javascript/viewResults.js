const resultsContainer = document.querySelector('.results--container')
const backBtn = document.querySelector('.results--navigation')

export const renderCountryResults = function (countryData) {
    //Need to use data from state in a HTML feature we can render

    resultsContainer.innerHTML = '';
    countryData.forEach(function (country) {
    const uniqueID = country.country.split(' ').shift();

        resultsContainer.insertAdjacentHTML('afterbegin', `
        <div class="country entry" data-id=${uniqueID}>
        <h2 class="country--name">${country.country}</h2>
        <div class="country--info">
         <p class="country--visited">Visited ${country.timesVisited} Time${country.timesVisited === 1 ? '' : 's'}</p>
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

let target;

export const renderLocationResults = function (locationData) {
  resultsContainer.innerHTML = '';
  backBtn.classList.remove('hidden');

    const selectedCountry = locationData.find(function (country) {
      const countryMatch = country.country.split(' ').shift();
      return countryMatch === target.dataset.id;
    })

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

export const addHandlerLocationResults = function (subscriber) {
  resultsContainer.addEventListener('click', function (e) {
    target = e.target.closest('.country');
    if (target.classList.contains('country')) subscriber();
  })
}

export const addHandlerGoBack = function (subscriber) {
  backBtn.addEventListener('click', function () {
    backBtn.classList.add('hidden');
    subscriber();
  })
}