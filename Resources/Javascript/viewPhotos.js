const mainView = document.querySelector(".primary--view");
const photosView = document.querySelector(".photos");
const photoView = document.querySelector(".photos--view");
const photoBackBtn = document.querySelector(".photos--navigation__back");

export const renderPhotoCollection = function (targetLocation, data) {
  // Clear photo view
  photoView.innerHTML = "";

  // Selected location chosen to display photos with their dates
  const selectedLocation = data.locations.find(function (location) {
    const nameTagFormat = location.nameTag.replaceAll(" ", "-");
    return nameTagFormat === targetLocation.dataset.id;
  });
  console.log(selectedLocation);

  // Unique ID to identify each photo collection
  const uniqeuCollectionID = `${selectedLocation.startDate}-${selectedLocation.endDate}`;
  console.log(uniqeuCollectionID);

  // Collection HTML Markup
  const collectionMarkup = `
    <div class="collection" data-id=${uniqeuCollectionID}>
    <div class="collection--date">
      <p><u>${selectedLocation.startDate} &mdash; ${selectedLocation.endDate}</u></p>
    </div>
    <div class="collection--photos">
     
    </div>
  </div>
  `;

  // Render collection and dates
  photoView.insertAdjacentHTML("afterbegin", collectionMarkup);
};

export const renderPhotos = function (targetLocation, data) {
  const collectionContainer = document.querySelector(".collection");
  const photoContainer = document.querySelector(".collection--photos");

  const selectedLocation = data.locations.find(function (location) {
    const nameTagFormat = location.nameTag.replaceAll(" ", "-");
    return nameTagFormat === targetLocation.dataset.id;
  });

  // Link the photo render to the correct collection and date
  if (
    collectionContainer.dataset.id ===
    `${selectedLocation.startDate}-${selectedLocation.endDate}`
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
