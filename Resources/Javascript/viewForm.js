const btnAdd = document.querySelector(".btn-add");
const btnClose = document.querySelector(".form--close");
const form = document.querySelector(".modal-form");
const formType = document.querySelector(".form-type");
const newForm = document.querySelector(".new--form");
const existingForm = document.querySelector(".existing--form");
const overlay = document.querySelector(".overlay");
const type = document.querySelectorAll(".type");
const inputs = document.querySelectorAll(".js--input-selector");

const resetForm = function () {
  hide();
  inputs.forEach(function (input) {
    input.value = "";
  });

  formType.firstElementChild.classList.add("active");
  formType.lastElementChild.classList.remove("active");
  existingForm.classList.add("hidden");
  newForm.classList.remove("hidden");
};

const hide = function () {
  form.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnAdd.addEventListener("click", function () {
  form.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnClose.addEventListener("click", resetForm);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") resetForm();
});

window.addEventListener("click", function (e) {
  const targ = e.target;
  if (targ.classList.contains("overlay")) resetForm();
});

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
