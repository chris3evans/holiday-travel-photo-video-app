const countryEntry = document.querySelector('.country')
const resultsContainer = document.querySelector('.results--container')

export const renderCountryResults = function (countryData) {
    //Need to use data from state in a HTML feature we can render
    resultsContainer.innerHTML = '';
    countryData.forEach(function (country) {
        resultsContainer.insertAdjacentHTML('afterbegin', `
        <div class="country entry">
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

export const addHandlerPageLoad = function (subscriber) {
    window.addEventListener('load', subscriber)
}

/*export const renderLocationResults = function () {

countryEntry.addEventListener('click', function () {
    console.log('Hello');
    resultsContainer.innerHTML = '';

    state.countries.forEach(function (country) {
        resultsContainer.insertAdjacentHTML("afterbegin" , `<div class="location entry">
        <h2 class="location--name">${country.locations.nameTag}</h2>

        <ul class="location--details">
          <li class="location--details__address">
            <i class="ion-location location--details__address-icon"></i>
            <p class="location--details__address-text">${country.locations.locationAddress}</p>
          </li>
          <div class="location--info">
          <li class="location--detais__date0">
            <p class="location--details__date"><i class="ion-calendar location--details__date-icon"></i>${country.locations.startDate} &mdash; ${country.locations.endDate}</p>
          </li>
          <li class="location--details__media">
            <i class="ion-images location--details__media-icon"></i>${location.numPhotos}<i class="ion-film-marker location--details__media-icon"></i>${location.numVideos}</li>
        </ul>
      </div>`)
    })
})
}*/