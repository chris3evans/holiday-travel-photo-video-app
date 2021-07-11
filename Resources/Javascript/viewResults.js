const resultsContainer = document.querySelector(".results--container");
const countryContainer = document.querySelector(
  ".results--container__countries"
);
const locationContainer = document.querySelector(
  ".results--container__locations"
);
const backBtn = document.querySelector(".results--navigation");

export const renderCountryResults = function (countryData) {
  //Need to use data from state in a HTML feature we can render

  countryContainer.innerHTML = "";
  countryData.forEach(function (country) {
    const uniqueCountryID = country.countryID;
    let photos = [];

    const countPhotos = function () {
      country.locations.forEach(function (location) {
        const locationArr = Object.entries(location);
        const [locationPhotos] = locationArr.filter(function (location) {
          return location[0].startsWith("photos");
        });
        const numPhotos = locationPhotos[1];
        numPhotos.forEach(function (photo) {
          photos.push(photo);
        });
      });
    };
    countPhotos();

    countryContainer.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="country entry" id=${uniqueCountryID}>
        <h2 class="country--name">${country.country}</h2>
        <div class="country--info">
         <p class="country--visited">Visited ${country.timesVisited} Time${
        country.timesVisited === 1 ? "" : "s"
      }</p>
         <ul class="country--details">
           <li>
             <i class="ion-images country--details__photos"></i>${
               photos.length
             }</li>
           <li>
             <i class="ion-film-marker country--details__videos"></i>12</li>
         </ul>
       </div>
       </div>
       `
    );
  });
};

/*let target;*/
let selectedCountry;

export const renderLocationResults = function (targetCountryID, locationData) {
  locationContainer.innerHTML = "";
  backBtn.classList.remove("hidden");
  locationContainer.classList.remove("hidden");
  countryContainer.classList.add("hidden");

  selectedCountry = locationData.find(function (country) {
    return country.countryID === targetCountryID;
  });

  selectedCountry.locations.forEach(function (location) {
    const uniqueLocationID = location.locationID;

    locationContainer.insertAdjacentHTML(
      "afterbegin",
      `<div class="location entry" id=${uniqueLocationID}>
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
            <i class="ion-images location--details__media-icon"></i>${location.photos.length}<i class="ion-film-marker location--details__media-icon"></i>6</li>
        </ul>
      </div>`
    );
  });
};

export const addHandlerPageLoad = function (subscriber) {
  window.addEventListener("load", subscriber);
};

export const addHandlerLocationResults = function (subscriber) {
  resultsContainer.addEventListener("click", function (e) {
    const targetCountry = e.target.closest(".country");
    targetCountry.classList.add("selected");
    const target = Number(e.target.closest(".country").id);
    if (targetCountry.classList.contains("country")) subscriber(target);
  });
};

export const addHandlerGoBack = function (subscriber) {
  backBtn.addEventListener("click", function () {
    backBtn.classList.add("hidden");
    locationContainer.classList.add("hidden");
    countryContainer.classList.remove("hidden");
    subscriber();
  });
};

export const addHandlerRevealPhotoView = function (subscriber) {
  resultsContainer.addEventListener("click", function (e) {
    const target = e.target.closest(".location");
    console.log(target);

    if (target.classList.contains("location")) {
      subscriber(target, selectedCountry);
    }
  });
};
