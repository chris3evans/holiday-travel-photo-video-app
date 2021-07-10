const mainView = document.querySelector(".primary--view");
const photosView = document.querySelector(".photos");
const photoView = document.querySelector(".photos--view");
const photoBackBtn = document.querySelector(".photos--navigation__back");
const btnAddToCol = document.querySelector(".btn-add");

export const renderPhotoCollection = function (
  targetLocation,
  data,
  stateData
) {
  console.log(stateData);
  const [findCountry] = stateData.filter(function (country) {
    return country.country === data.country;
  });
  console.log(findCountry);
  const countryIDPart = findCountry.country.replaceAll(" ", "-");
  console.log(countryIDPart);
  // Clear photo view
  photoView.innerHTML = "";

  // Selected location chosen to display photos with their dates
  const selectedLocation = data.locations.find(function (location) {
    const nameTagFormat = location.nameTag.replaceAll(" ", "-");
    return nameTagFormat === targetLocation.dataset.id;
  });

  // Unique ID to identify each photo collection
  const uniqeuCollectionID = `${selectedLocation.startDate}-${selectedLocation.endDate}-${countryIDPart}`;

  // Collection HTML Markup
  const collectionMarkup = `
    <div class="collection" data-id=${uniqeuCollectionID}>
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

export const renderPhotos = function (targetLocation, data, stateData) {
  const [findCountry] = stateData.filter(function (country) {
    return country.country === data.country;
  });
  const countryIDPart = findCountry.country.replaceAll(" ", "-");

  const collectionContainer = document.querySelector(".collection");
  const photoContainer = document.querySelector(".collection--photos");

  const selectedLocation = data.locations.find(function (location) {
    const nameTagFormat = location.nameTag.replaceAll(" ", "-");
    return nameTagFormat === targetLocation.dataset.id;
  });

  // Link the photo render to the correct collection and date
  if (
    collectionContainer.dataset.id ===
    `${selectedLocation.startDate}-${selectedLocation.endDate}-${countryIDPart}`
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
    photosView.classList.add("hidden");
    mainView.classList.remove("hidden");
  });
};

export const addHandlerAddToCol = function (subscriber) {
  document.addEventListener("change", function (e) {
    if (
      e.target.classList.contains("btn-add") ||
      e.target.classList.contains("files2")
    ) {
      // Unique ID of the collection we want to add photos to
      const targetCollectionID = e.target.closest(".collection").dataset.id;
      console.log(targetCollectionID);
      subscriber(targetCollectionID);
    }
  });
};
