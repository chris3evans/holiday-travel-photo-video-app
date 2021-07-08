const btnAdd = document.querySelector(".search--add");
const btnClose = document.querySelector(".form--close");
const btnPost = document.querySelector(".post-media");
const form = document.querySelector(".modal-form");
const formType = document.querySelector(".form-type");
const newForm = document.querySelector(".new--form");
const existingForm = document.querySelector(".existing--form");
const overlay = document.querySelector(".overlay");
const type = document.querySelectorAll(".type");
const inputs = document.querySelectorAll(".js--input-selector");
const btnFile = document.querySelector(".choose-media");

const fileInput = document.querySelector(".files");

const hide = function () {
  form.classList.add("hidden");
  overlay.classList.add("hidden");
};

export const resetForm = function () {
  hide();
  inputs.forEach(function (input) {
    input.value = "";
  });
  formType.firstElementChild.classList.add("active");
  formType.lastElementChild.classList.remove("active");
  existingForm.classList.add("hidden");
  newForm.classList.remove("hidden");
};

export const addHandlerOpenFiles = function () {
  btnFile.addEventListener("click", function () {
    document.getElementById("myfiles").click();
  });
};

export const addHandlerChooseImages = function (subscriber) {
  /*fileInput.onchange = getPhotoData();*/
  fileInput.addEventListener("click", function () {
    subscriber();
    /*fileInput.onchange = function () {
      const fileObject = fileInput.files;
      const fileArr = Object.values(fileObject);

      const filePathArr = [];

      fileArr.forEach(function (file) {
        if (file.type === "image/jpeg" || file.type === "image/png") {
          filePathArr.push(file.webkitRelativePath);
        }
      });
      console.log(filePathArr);
    };*/
  });
};

export const addHandlerOpenForm = function () {
  btnAdd.addEventListener("click", function (e) {
    e.preventDefault();

    form.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
};

export const addHandlerCloseForm = function () {
  btnClose.addEventListener("click", resetForm);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") resetForm();
  });

  window.addEventListener("click", function (e) {
    const targ = e.target;
    if (targ.classList.contains("overlay")) resetForm();
  });
};

export const addHandlerSwitchForm = function () {
  formType.addEventListener("click", function (e) {
    const typeForm = e.target.closest(".type");
    if (typeForm) {
      type.forEach(function (el) {
        el.classList.remove("active");
      });
      typeForm.classList.toggle("active");
      newForm.classList.toggle("hidden");
      existingForm.classList.toggle("hidden");
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
