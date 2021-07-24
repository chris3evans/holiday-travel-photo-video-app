const photoPopUp = document.querySelector(".photo__pop-up");
const photoNoteBtnEl = document.querySelector(".btn__note");
const photoNoteInput = document.querySelector(".photo__note--input");
const revealNoteBtn = document.querySelector(".btn__note-reveal");
const noteContainer = document.querySelector(".note__container");
const testOpenBtn = document.querySelector(".search--logo");
const larPhotoCloseBtn = document.querySelector(".btn__close");
const larPhotoPostBtn = document.querySelector(".btn__post-note");
const overlay = document.querySelector(".overlay2");

export const addHandlerSelectPhotoNote = function (subscriber) {
  photoNoteInput.addEventListener("click", function () {
    subscriber();
  });
};

export const addHandlerOpenLargePhoto = function (subscriber) {
  testOpenBtn.addEventListener("click", function (e) {
    e.preventDefault();
    subscriber();
    photoPopUp.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
};

export const addHandlerCloseLargePhoto = function () {
  larPhotoCloseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    photoPopUp.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  overlay.addEventListener("click", function () {
    photoPopUp.classList.add("hidden");
    overlay.classList.add("hidden");

    document.addEventListener("keydown", function (e) {
      e.preventDefault();
      if (e.key === "Escape") {
        photoPopUp.classList.add("hidden");
        overlay.classList.add("hidden");
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

    // If there IS a note already on this photo
  } else {
    photoNoteBtnEl.classList.add("hidden");
    revealNoteBtn.classList.remove("hidden");
    photoNoteInput.classList.add("hidden");
    noteContainer.classList.add("hidden");
  }
};
