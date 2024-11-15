//--------------------------FORM FUNCTION----------------------------SHOW FORM FOR USER AND GIVE CHOICE FOR CLOSE FORM//
export function form_fnc(button__form, popup__style, close, button__save) {
    button__form.addEventListener("click", function () {
      popup__style.classList.add("popup_is-opened");
      popup__style.classList.remove("popup_is-animated");
    });
  
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        popup__style.classList.add("popup_is-animated");
        popup__style.classList.remove("popup_is-opened");
      }
    });
    close.forEach((button) =>
      button.addEventListener("click", function () {
        popup__style.classList.add("popup_is-animated");
        popup__style.classList.remove("popup_is-opened");
      })
    );
    button__save.forEach((button) =>
      button.addEventListener("click", function () {
        popup__style.classList.add("popup_is-animated");
        popup__style.classList.remove("popup_is-opened");
      })
    );
  }