const photoPopUp = document.querySelector(".photo__pop-up");
const photoNoteBtnEl = document.querySelector(".btn__note");
const photoNoteInput = document.querySelector(".photo__note--input");
const revealNoteBtn = document.querySelector(".btn__note-reveal");
const noteContainer = document.querySelector(".note__container");
const larPhotoCloseBtn = document.querySelector(".btn__close");
const larPhotoPostBtn = document.querySelector(".btn__post-note");
const larPhotoPostBtnEl = document.querySelector(".btn__note");
const larPhoto = document.querySelector(".photo__large");
const overlay = document.querySelector(".overlay2");

export const addHandlerSelectPhotoNote = function (subscriber) {
  photoNoteInput.addEventListener("click", function () {
    subscriber();
  });
};

export const addHandlerOpenLargePhoto = function (subscriber) {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("photo")) {
      console.log(e.target);
      e.target.classList.add("selected");
      console.log(e.target);
      // Reveal Large Photo Pop Up
      subscriber();
      photoPopUp.classList.remove("hidden");
      overlay.classList.remove("hidden");

      // Load And Render Correct Image Path URL In Pop Up
      const largeUrl = e.target.getAttribute("src");
      larPhoto.src = largeUrl;

      const imageClickedID = e.target.id;
      console.log(imageClickedID);
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

export const addHandlerOpenNote = function () {
  revealNoteBtn.addEventListener("click", function (e) {
    e.preventDefault();
    noteContainer.classList.toggle("hidden");
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

export const renderNotes = function () {
  console.log("hi");
};
