import * as model from "../Javascript/model.js";

const btnAdd = document.querySelector(".search--add");
const btnClose = document.querySelector(".form--close");
const btnPost = document.querySelector(".post-media");
const form = document.querySelector(".modal-form");
const newForm = document.querySelector(".new--form");
const overlay = document.querySelector(".overlay");
const inputs = document.querySelectorAll(".js--input-selector");
const btnFile = document.querySelector(".custom-file-upload");

const fileInput = document.querySelector("#selectedFiles");

const hide = function () {
  form.classList.add("hidden");
  overlay.classList.add("hidden");
};

export const resetForm = function () {
  const fileUploadTexts = document.querySelectorAll(".number-upload");
  // Hide the form modal
  hide();
  console.log(fileInput.files);
  console.log(model.filePathArr);

  // Clear each field of any text
  inputs.forEach(function (input) {
    input.value = "";
  });

  // If the number files text exists remove it
  if (fileUploadTexts) {
    fileUploadTexts.forEach(function (uploadText) {
      uploadText.remove();
    });
  }
  /*newForm.classList.remove("hidden"); */
};

const renderNumFiles = function (photoArray) {
  console.log(photoArray);
  const numFiles = photoArray.length;
  console.log(photoArray.length);
  const plural = numFiles > 1 ? "s" : "";
  const markup = `
  <div class="number-upload">${numFiles} File${plural} Selected</div>
  `;
  btnFile.insertAdjacentHTML("afterend", markup);
};

export const addHandlerChooseImages = function (subscriber, photoArray) {
  btnFile.addEventListener("change", function () {
    subscriber();
    console.log(fileInput.files);

    renderNumFiles(/*photoArray*/ fileInput.files);
  });
};

export const addHandlerOpenForm = function () {
  btnAdd.addEventListener("click", function (e) {
    e.preventDefault();

    form.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
};

export const addHandlerCloseForm = function (subscriber) {
  btnClose.addEventListener("click", function () {
    subscriber();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      subscriber();
    }
  });

  window.addEventListener("click", function (e) {
    const targ = e.target;
    if (targ.classList.contains("overlay")) {
      subscriber();
    }
  });
};

const getFormData = function () {
  const newDataArr = [...new FormData(newForm)];
  const newData = Object.fromEntries(newDataArr);
  return newData;
};

export const addHandlerSubmitNewFormClick = function (subscriber) {
  btnPost.addEventListener("click", function (e) {
    e.preventDefault();
    subscriber(getFormData());
    resetForm();
  });
};

export const addHandlerSubmitNewFormKey = function (subscriber) {
  document.addEventListener("keydown", function (e) {
    if (!form.classList.contains("hidden") && e.key === "Enter") {
      e.preventDefault();
      subscriber(getFormData());
      resetForm();
    }
  });
};
