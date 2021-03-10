class ContactForm {
    constructor () {    
        this.imeValid = false;
        this.prezimeValid = false;
        this.telefonValid = false;
        this.emailValid = false;
        this.porukaValid = false;
    }

    requiredTextValidation(value) {
        if (value.trim().length === 0)
            throw new ValidationException('Polje je obavezno');
    }

    requiredSelectValidation(value) {
        if (value == 0)
            throw new ValidationException('Polje je obavezno');
    }

    emailValidation(value) {
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!regex.test(value))
            throw new ValidationException('Neispravan format');
    }

    phoneValidation(value) {
        let regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
        if (!regex.test(value))
            throw new ValidationException('Neispravan format');
    }

    nameValidation(value) {
        //let regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        let regex = /^[A-Za-z][A-Za-z\'\-\.]+([\ A-Za-z][A-Za-z\'\-\.]+)*/;
        if (!regex.test(value))
            throw new ValidationException('Neispravan format');
    }

    validateIme() {
        let element = $('#ime');
        let value = element.val();
        this.imeValid = false;

        let required = false;

        try {
            this.requiredTextValidation(value);
            required = true;
            $('#ime-failed-required').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#ime-failed-required').removeClass('d-none');
        }

        let validInput = false;

        try {
            this.nameValidation(value);
            validInput = true;
            $('#ime-failed-format').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#ime-failed-format').removeClass('d-none');
        }

        if (required && validInput) {
            element.addClass('is-valid');
            element.removeClass('is-invalid');
            this.imeValid = true;
        }

        return this.imeValid;
    }

    validatePrezime() {
        let element = $('#prezime');
        let value = element.val();
        this.prezimeValid = false;

        let required = false;

        try {
            this.requiredTextValidation(value);
            required = true;
            $('#prezime-failed-required').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#prezime-failed-required').removeClass('d-none');
        }

        let validInput = false;

        try {
            this.nameValidation(value);
            validInput = true;
            $('#prezime-failed-format').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#prezime-failed-format').removeClass('d-none');
        }

        if (required && validInput) {
            element.addClass('is-valid');
            element.removeClass('is-invalid');
            this.prezimeValid = true;
        }
    }

    validateTelefon() {
        let element = $('#telefon');
        let value = element.val();
        this.telefonValid = false;

        let required = false;

        try {
            this.requiredTextValidation(value);
            required = true;
            $('#telefon-failed-required').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#telefon-failed-required').removeClass('d-none');
        }

        let validInput = false;

        try {
            this.phoneValidation(value);
            validInput = true;
            $('#telefon-failed-format').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#telefon-failed-format').removeClass('d-none');
        }

        if (required && validInput) {
            element.addClass('is-valid');
            element.removeClass('is-invalid');
            this.telefonValid = true;
        }

        return this.telefonValid;
    }

    validateEmail() {
        let element = $('#email');
        let value = element.val();
        this.emailValid = false;

        let required = false;

        try {
            this.requiredTextValidation(value);
            required = true;
            $('#email-failed-required').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#email-failed-required').removeClass('d-none');
        }

        let validInput = false;

        try {
            this.emailValidation(value);
            validInput = true;
            $('#email-failed-format').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#email-failed-format').removeClass('d-none');
        }

        if (required && validInput) {
            element.addClass('is-valid');
            element.removeClass('is-invalid');
            this.emailValid = true;
        }

        return this.emailValid;
    }

    validatePoruka() {
        let element = $('#poruka');
        let value = element.val();
        this.porukaValid = false;

        let required = false;

        try {
            this.requiredTextValidation(value);
            required = true;
            $('#poruka-failed-required').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#poruka-failed-required').removeClass('d-none');
        }

        if (required) {
            element.addClass('is-valid');
            element.removeClass('is-invalid');
            this.porukaValid = true;
        }

        return this.porukaValid;
    }


    isValid() {
        this.validateIme();
        this.validatePrezime();
        this.validateTelefon();
        this.validateEmail();
        this.validatePoruka();

        return this.imeValid == true &&
        this.prezimeValid == true &&
        this.telefonValid == true &&
        this.emailValid == true &&
        this.porukaValid == true;
    }
}

$(function () {
    let contactForm = new ContactForm();

    $('#telefon').blur((event) => {
        contactForm.validateTelefon();
    });

    $('#email').blur((event) => {
        contactForm.validateEmail();
    });

    $('#ime').blur((event) => {
        contactForm.validateIme();
    });

    $('#prezime').blur((event) => {
        contactForm.validatePrezime();
    });

    $('#poruka').blur((event) => {
        contactForm.validatePoruka();
    });

    $('#contact-form').on('submit', (event) => {
        event.preventDefault();
        if (contactForm.isValid()) {
            new Noty({
                text: 'Uspešno ste poslali poruku!',
                type: 'success'
            }).show();
        }
    });
});