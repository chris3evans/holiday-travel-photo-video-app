const searchBtn = document.querySelector('.search--bar__btn');

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

export const addHandlerClearStorage = function (subscriber) {
  searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    subscriber();
  })
}