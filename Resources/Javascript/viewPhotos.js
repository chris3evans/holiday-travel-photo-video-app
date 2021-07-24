const mainView = document.querySelector(".primary--view");
const photosView = document.querySelector(".photos");
const photoView = document.querySelector(".photos--view");
const photoBackBtn = document.querySelector(".photos--navigation__back");
const btnAddToCol = document.querySelector(".btn-add");

export const renderPhotoCollection = function (
  targetLocation,
  countryData,
  stateData
) {
  targetLocation.classList.add("selected");

  // ID of location that was clicked on
  const targetLocationID = Number(targetLocation.id);

  // Location object who's ID matches that of the one clicked
  const selectedLocation = countryData.locations.find(function (location) {
    return location.locationID === targetLocationID;
  });

  // Clear photo view
  photoView.innerHTML = "";

  // Unique ID to identify each photo collection
  const targetCollectionID = Number(
    `${countryData.countryID}${targetLocationID}`
  );

  // Collection HTML Markup
  const collectionMarkup = `
    <div class="collection" id=${targetCollectionID}>
      <div class="collection--date">
        <p><u>${selectedLocation.startDate} &mdash; ${selectedLocation.endDate}</u></p>
      </div>
      <div class="collection--photos">
        <div class="collection--photo__add">
          <label class="btn-add">
            <input
              type="file"
              class="files2"
              multiple="multiple"
              directory
              webkitdirectory
            />
              <svg class="btn--add__icon">
                <use xlink:href="Resources/CSS/sprite.svg#icon-plus"></use>
              </svg>
          </label>
          
        </div>
        </div>
      </div>
    </div>
  `;

  // Render collection and dates
  photoView.insertAdjacentHTML("afterbegin", collectionMarkup);
};

export const renderPhotos = function (targetLocation, countryData, stateData) {
  console.log(targetLocation);
  console.log(countryData);
  const collectionContainer = document.querySelector(".collection");
  const photoContainer = document.querySelector(".collection--photos");

  const targetLocationID = Number(targetLocation.id);

  const selectedLocation = countryData.locations.find(function (location) {
    return location.locationID === targetLocationID;
  });
  console.log(selectedLocation);

  // Link the photo render to the correct collection and date
  if (
    Number(collectionContainer.id) ===
    Number(`${countryData.countryID}${targetLocationID}`)
  ) {
    // Loop over image URL array, rendering each one in the collection
    selectedLocation.photos.forEach(function (photo) {
      photoContainer.insertAdjacentHTML(
        "afterbegin",
        `
          <div class="collection--photo">
            <img
              src="Resources/${photo}"
              class="photo"
            />
          </div>
        `
      );
    });
  }
};

export const addHandlerLeavePhotoView = function () {
  photoBackBtn.addEventListener("click", function () {
    const locationResults = document.querySelectorAll(".location");
    const collectionResults = document.querySelectorAll(".collection--photos");

    photosView.classList.add("hidden");
    mainView.classList.remove("hidden");
    console.log(locationResults);

    locationResults.forEach(function (locationResult) {
      locationResult.classList.remove("selected");
    });
    collectionResults.forEach(function (collectionResult) {
      collectionResult.classList.remove("selected");
    });
  });
};

export const addHandlerAddToCol = function (subscriber) {
  document.addEventListener("change", function (e) {
    if (
      e.target.classList.contains("btn-add") ||
      e.target.classList.contains("files2")
    ) {
      // Add selected class to collection "change" occured on
      const targetCollection = e.target.closest(".collection--photos");
      console.log(targetCollection);
      targetCollection.classList.add("selected");
      // Unique ID of the collection we want to add photos to
      const targetCollectionID = e.target.closest(".collection").id;
      console.log(targetCollectionID);
      subscriber(targetCollectionID);
    }
  });
};

// Keep photo pop up hidden with an empty image URL
// When rendered, reveal the pop up render with selected image URL
// When closed, hide the pop up and clear the image URL
