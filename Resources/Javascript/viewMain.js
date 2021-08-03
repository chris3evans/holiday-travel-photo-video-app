const searchBtn = document.querySelector(".search--bar__btn");
const photoInterface = document.querySelector(".photos");
const mainInterface = document.querySelector(".primary--view");

const filtersContainer = document.querySelector(".search--filter__filters");
const mostPhotosBtn = document.querySelector("#photos");

$(document).ready(function () {
  $(".js--nav-icon").click(function () {
    const nav = $(".js--main-nav");
    const icon = $(".js--nav-icon i");

    nav.slideToggle(250);

    if (icon.hasClass("ion-navicon-round")) {
      icon.addClass("ion-close-round");
      icon.removeClass("ion-navicon-round");
    } else {
      icon.addClass("ion-navicon-round");
      icon.removeClass("ion-close-round");
    }
  });
});

export const sortByPhotos = function (stateData) {
  // State data = array of country objects

  // Sorts objects in decending number of photos
  const sort = function (a, b) {
    if (a.totalPhotos < b.totalPhotos) {
      return -1;
    }
    if (a.totalPhotos > b.totalPhotos) {
      return 1;
    }
    return 0;
  };
  stateData.sort(sort);
  console.log(stateData);

  const sortedByPhotoState = stateData;
  return sortedByPhotoState;
};

export const addHandlerClearStorage = function (subscriber) {
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    subscriber();
  });
};

export const hidePhotoInterface = function () {
  photoInterface.classList.remove("hidden");
  mainInterface.classList.add("hidden");
};

export const addHandlerSortByPhotos = function (subscriber) {
  filtersContainer.addEventListener("change", function (e) {
    if (this.value === "photos") {
      subscriber();
    }
  });
};
