const photoPopUp = document.querySelector(".photo__pop-up");
const photoNoteBtnEl = document.querySelector(".btn__note");
const photoNoteInputEl = document.querySelector(".photo__note");
const photoNoteInput = document.querySelector(".photo__note--input");
const revealNoteBtn = document.querySelector(".btn__note-reveal");
const noteContainer = document.querySelector(".note__container");
const larPhotoCloseBtn = document.querySelector(".btn__close");
const larPhotoPostBtn = document.querySelector(".btn__post-note");
const larPhotoPostBtnEl = document.querySelector(".btn__note");
const larPhoto = document.querySelector(".photo__large");
const overlay = document.querySelector(".overlay2");

export const findNote = function (stateData) {
  const countriesNl = document.querySelectorAll(".country");
  const locationsNl = document.querySelectorAll(".location");
  const photosNl = document.querySelectorAll(".photo");

  const countriesArr = Array.from(countriesNl);
  const locationsArr = Array.from(locationsNl);
  const photosArr = Array.from(photosNl);

  // ID of selected country, location and photo
  const clickedCountryID = +countriesArr.find(function (country) {
    return country.classList.contains("selected");
  }).id;
  const clickedLocationID = +locationsArr.find(function (location) {
    return location.classList.contains("selected");
  }).id;

  const clickedPhotoID = +photosArr.find(function (photo) {
    return photo.classList.contains("selected");
  }).id;

  // The note value of the photo clicked
  const [targetPhotoNotes] = stateData
    .find(function (country) {
      return country.countryID === clickedCountryID;
    })
    .locations.find(function (location) {
      return location.locationID === clickedLocationID;
    })
    .photos.find(function (photo) {
      return photo.photoID === clickedPhotoID;
    }).notes;

  return targetPhotoNotes;
};

export const addHandlerSelectPhotoNote = function (subscriber) {
  photoNoteInput.addEventListener("click", function () {
    subscriber();
  });
};

export const addHandlerOpenLargePhoto = function (subscriber) {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("photo")) {
      e.target.classList.add("selected");
      // Reveal Large Photo Pop Up
      photoPopUp.classList.remove("hidden");
      overlay.classList.remove("hidden");

      // Load And Render Correct Image Path URL In Pop Up
      const largeUrl = e.target.getAttribute("src");
      larPhoto.src = largeUrl;

      // Load And Render Correct Note (if it exists)

      // ID of photo who's note we want to retreive
      const targetPhotoID = e.target.id;
      subscriber(targetPhotoID);
    }
  });
};

const closeLargePhoto = function () {
  photoPopUp.classList.add("hidden");
  overlay.classList.add("hidden");

  const photoElArr = document.querySelectorAll(".photo");
  photoElArr.forEach(function (photo) {
    photo.classList.remove("selected");
  });
};

export const addHandlerCloseLargePhoto = function () {
  larPhotoCloseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    closeLargePhoto();
  });

  overlay.addEventListener("click", function () {
    closeLargePhoto();

    document.addEventListener("keydown", function (e) {
      e.preventDefault();
      if (e.key === "Escape") {
        closeLargePhoto();
      }
    });
  });
};

export const addHandlerNoteInput = function () {
  photoNoteInput.addEventListener("click", function (e) {
    e.preventDefault();

    if (document.activeElement) {
      photoNoteBtnEl.classList.remove("hidden");
    } else if (!document.activeElement) {
      console.log("no");
    }
  });
};

export const addHandlerOpenNote = function (noteText) {
  revealNoteBtn.addEventListener("click", function (e) {
    e.preventDefault();
    /*if (noteContainer.classList.contains("hidden")) {
    } else {
      noteContainer.classList.add("hidden");
    }*/
    noteContainer.classList.remove("hidden");
    noteContainer.innerHTML = noteText;
  });
};

export const initializePhotoInput = function () {
  // If there is NOT a note already on this photo
  if (noteContainer.innerHTML === "") {
    revealNoteBtn.classList.add("hidden");
    larPhotoPostBtnEl.classList.add("hidden");

    // If there IS a note already on this photo
  } else {
    photoNoteBtnEl.classList.add("hidden");
    revealNoteBtn.classList.remove("hidden");
    photoNoteInput.classList.add("hidden");
    noteContainer.classList.add("hidden");
  }
};

export const addHandlerSubmitNote = function (subscriber) {
  larPhotoPostBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (photoNoteInput.value === "") {
      console.error(
        "You haven't written anything! Please enter text to add a note to this photo!"
      );

      // If there is text input
    } else {
      // Code in model which handles note adding is executed
      subscriber();
    }
  });
};

export const renderNotes = function (noteText) {
  // If there is a note to render
  if (noteText) {
    // Render "Reveal Note" button
    revealNoteBtn.classList.remove("hidden");
    // Hide note input
    photoNoteInput.classList.add("hidden");
  } else {
    // Render placeholder text
    photoNoteInput.classList.remove("hidden");
    // Hide "Reveal Note" button
    revealNoteBtn.classList.add("hidden");
  }
};
