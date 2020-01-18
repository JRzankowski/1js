document.addEventListener("DOMContentLoaded", function () {

// nałożenie datapickera na odpowiednie inputy + walidacja
    $(".form__input--data-contact").datepicker({
        onClose: function () {
            if (inputDateFrom.value.length !== 0 && inputDateTo.value.length !== 0) {
                if (inputDateFrom.value > inputDateTo.value) {
                    dataContainer.firstElementChild.classList.add("message-error");
                    inputDateFrom.style.borderColor = "red";
                    inputDateTo.style.borderColor = "red";
                    inputDateFrom.classList.add("error");
                    inputDateTo.classList.add("error");
                } else {
                    dataContainer.firstElementChild.classList.remove("message-error");
                    inputDateFrom.style.borderColor = "green";
                    inputDateTo.style.borderColor = "green";
                    inputDateFrom.classList.remove("error");
                    inputDateTo.classList.remove("error");
                    inputDateFrom.style.boxShadow = "0 1px 3px rgba(96, 96, 96, 0.12), 0 1px 2px rgba(60, 60, 60, 0.24)";
                    inputDateTo.style.boxShadow = "0 1px 3px rgba(96, 96, 96, 0.12), 0 1px 2px rgba(60, 60, 60, 0.24)";
                }
            }
        },

    });

    const form = document.querySelector(".form");
    const dataContainer = document.querySelector(".form__data--container");
    const inputName = document.querySelector(".form__input-name");
    const inputSecondName = document.querySelector(".form__input-second-name");
    const inputSurname = document.querySelector(".form__input-surname");
    const inputNumber = document.querySelector(".form__input-number");
    const select = document.querySelector(".select");
    const inputDateFrom = document.querySelector(".form__input--data-contact-from");
    const inputDateTo = document.querySelector(".form__input--data-contact-to");






    const regex = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/;
    const regex2 = /[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ-]/;

    function validate(e) {
        const chars = e.target.value.split('');
        const char = chars.pop();
        if (!regex.test(char)) {
            e.target.value = chars.join('');
        }
    }

    function validate2(e) {
        const chars = e.target.value.split('');
        const char = chars.pop();
        if (!regex2.test(char)) {
            e.target.value = chars.join('');
        }
    }

    inputName.addEventListener('input', validate);
    inputSecondName.addEventListener('input', validate);
    inputSurname.addEventListener('input', validate2);
//walidacja w czasie rzeczywistym
    [inputName, inputSecondName, inputSurname, inputNumber, select].forEach(function (el) {
        el.addEventListener("input", function () {

            if ((this.value.length === 0) && (this.classList.contains("text"))) {
                this.previousElementSibling.firstElementChild.classList.remove("message-error");
                this.classList.remove("error");
                this.style.borderColor = "silver";

            } else if ((this.value.length < 3 && this.value.length >= 1) && (this.classList.contains("text"))) {
                this.classList.add("error");
                this.previousElementSibling.firstElementChild.classList.add("message-error");
                this.style.borderColor = "red";

            } else if ((this.value.length > 3) && (this.classList.contains("text"))) {
                this.previousElementSibling.firstElementChild.classList.remove("message-error");
                this.style.borderColor = "#0EAA00";
                this.classList.remove("error");
                this.style.boxShadow = "0 1px 3px rgba(96, 96, 96, 0.12), 0 1px 2px rgba(60, 60, 60, 0.24)";


            } else if (this.classList.contains("form__input-number")) {
                if (this.value.length === 0) {
                    this.style.borderColor = "silver";
                    this.classList.remove("error");
                    this.previousElementSibling.firstElementChild.classList.remove("message-error");

                } else if (this.value.length < 11) {
                    this.style.borderColor = "red";
                    this.classList.add("error");
                    this.previousElementSibling.firstElementChild.classList.add("message-error");
                } else {
                    this.classList.remove("error");
                    this.style.borderColor = "#0EAA00";
                    this.previousElementSibling.firstElementChild.classList.remove("message-error");
                    this.style.boxShadow = "0 1px 3px rgba(96, 96, 96, 0.12), 0 1px 2px rgba(60, 60, 60, 0.24)";

                }

            } else if (this.classList.contains("select")) {
                if (this.value.length > 0) {
                    this.style.borderColor = "#0EAA00";
                    this.style.boxShadow = "0 1px 3px rgba(96, 96, 96, 0.12), 0 1px 2px rgba(60, 60, 60, 0.24)";
                }
            }
        });
    });
//walidacja na submicie
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let errors = [];
        [inputName, inputSecondName, inputSurname, inputNumber, select, inputDateFrom, inputDateTo].forEach(function (el) {

            if (el.classList.contains("error") || (el.value.length === 0)) {
                errors.push(el);
            }
        });
        if (errors.length > 0) {
            errors.forEach(function (el) {
                el.focus();
                el.style.boxShadow = "0 1px 3px rgba(255, 18, 0, 0.89), 0 1px 2px rgb(255, 15, 0)";

            })
        } else {
            this.submit();
        }


    });



});
