const btnAdd = document.querySelector(".btn-add");
const btnClose = document.querySelector(".btn-close");
const form = document.querySelector(".modal-form");
const formType = document.querySelector(".form-type");
const overlay = document.querySelector(".overlay");
const type = document.querySelectorAll(".type");

btnAdd.addEventListener("click", function () {
  form.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnClose.addEventListener("click", function () {
  form.classList.add("hidden");
  overlay.classList.add("hidden");
});

formType.addEventListener("click", function (e) {
  e.preventDefault();

  const typeForm = e.target.closest(".type");
  if (typeForm) {
    type.forEach(function (el) {
      el.classList.remove("active");
    });
    typeForm.classList.toggle("active");
  }

  console.log(type);
});
