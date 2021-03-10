class BuyForm {
    constructor () {    
        this.imeValid = false;
        this.drzavaValid = false;
        this.drzavaManualValid = false;
        this.drzavaManualRequired = false;
        this.adresaValid = false;
        this.postanskiBrojValid = false;
        this.mestoValid = false;
        this.telefonValid = false;
        this.emailValid = false;
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
        let regex = /^[A-Za-z][A-Za-z\'\-\.]+([\ A-Za-z][A-Za-z\'\-\.]+)*/;
        if (!regex.test(value))
            throw new ValidationException('Neispravan format');
    }

    validateIme() {
        let element = $('#name');
        let value = element.val();
        this.imeValid = false;

        let required = false;
        
        try {
            this.requiredTextValidation(value);
            required = true;
            $('#name-failed-required').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#name-failed-required').removeClass('d-none');
        }

        let validInput = false;

        try {
            this.nameValidation(value);
            validInput = true;
            $('#name-failed-format').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#name-failed-format').removeClass('d-none');
        }

        if (required && validInput) {
            element.addClass('is-valid');
            element.removeClass('is-invalid');
            this.imeValid = true;
        }

        return this.imeValid;
    }

    validateDrzava() {
        let element = $('#drzava');
        let value = element.val();
        this.drzavaValid = false;

        try {
            this.requiredSelectValidation(value);
            $('#drzava-failed-required').addClass('d-none');
            element.removeClass('is-invalid');
            element.addClass('is-valid');
            this.drzavaValid = true;
        } catch(e) {
            element.addClass('is-invalid');
            $('#drzava-failed-required').removeClass('d-none');
        }

        if (value == 5) {
            $('#drzava_manual_group').removeClass('d-none');
            this.drzavaManualRequired = true;
            this.drzavaManualValid = false;
        }
        else {
            $('#drzava_manual_group').addClass('d-none');
            this.drzavaManualRequired = false;
            this.drzavaManualValid = true;
        }

        return this.drzavaValid;
    }

    validateDrzavaManual() {
        let element = $('#drzava_manual');
        let value = element.val();
        //this.drzavaManualValid = false;

        let required = false;

        try {
            if(!this.drzavaManualRequired)
                throw new ValidationException('Greska!');
            this.requiredTextValidation(value);
            required = true;
            $('#drzava_manual-failed-required').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#drzava_manual-failed-required').removeClass('d-none');
        }

        if (required) {
            element.addClass('is-valid');
            element.removeClass('is-invalid');
            this.drzavaManualValid = true;
        }

        return this.drzavaManualValid;
    }

    validateAdresa() {
        let element = $('#ulica_i_broj');
        let value = element.val();
        this.adresaValid = false;

        let required = false;

        try {
            this.requiredTextValidation(value);
            required = true;
            $('#ulica_i_broj-failed-required').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#ulica_i_broj-failed-required').removeClass('d-none');
        }

        if (required) {
            element.addClass('is-valid');
            element.removeClass('is-invalid');
            this.adresaValid = true;
        }

        return this.adresaValid;
    }

    validatePostanskiBroj() {
        let element = $('#postanski_broj');
        let value = element.val();
        this.postanskiBrojValid = false;

        let required = false;

        try {
            this.requiredTextValidation(value);
            required = true;
            $('#postanski_broj-failed-required').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#postanski_broj-failed-required').removeClass('d-none');
        }

        if (required) {
            element.addClass('is-valid');
            element.removeClass('is-invalid');
            this.postanskiBrojValid = true;
        }

        return this.postanskiBrojValid;
    }

    validateMesto() {
        let element = $('#mesto');
        let value = element.val();
        this.mestoValid = false;

        let required = false;
        
        try {
            this.requiredTextValidation(value);
            required = true;
            $('#mesto-failed-required').addClass('d-none');
        } catch(e) {
            element.addClass('is-invalid');
            $('#mesto-failed-required').removeClass('d-none');
        }

        if (required) {
            element.addClass('is-valid');
            element.removeClass('is-invalid');
            this.mestoValid = true;
        }

        return this.mestoValid;
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


    isValid() {
        this.validateIme();
        this.validateDrzava();
        this.validateDrzavaManual();
        this.validateAdresa();
        this.validatePostanskiBroj();
        this.validateMesto();
        this.validateTelefon();
        this.validateEmail();

        return this.imeValid == true &&
            this.drzavaValid == true &&
            this.drzavaManualValid == true &&
            this.adresaValid == true &&
            this.postanskiBrojValid == true &&
            this.mestoValid == true &&
            this.telefonValid == true &&
            this.emailValid == true;
    }

    saveInputs() {
        const firstAndLastName = $('#name').val();
        const country = $('#drzava').val();
        const otherCountry = $('#drzava_manual').val();
        const streetAndNumber = $('#ulica_i_broj').val();
        const postNumber = $('#postanski_broj').val();
        const city = $('#mesto').val();
        const phoneNumber = $('#telefon').val();
        const email = $('#email').val();

        const obj = {
            firstAndLastName: firstAndLastName,
            country: country,
            otherCountry: otherCountry,
            streetAndNumber: streetAndNumber,
            postNumber: postNumber,
            city: city,
            phoneNumber: phoneNumber,
            email: email
        };

        window.localStorage.setItem('saved_inputs', JSON.stringify(obj));
    }

    getSavedInputs() {
        const obj = JSON.parse(window.localStorage.getItem('saved_inputs'));
        if (obj != null) {
            $('#name').val(obj.firstAndLastName);
            $('#drzava').val(obj.country);
            $('#drzava_manual').val(obj.otherCountry);
            $('#ulica_i_broj').val(obj.streetAndNumber);
            $('#postanski_broj').val(obj.postNumber);
            $('#mesto').val(obj.city);
            $('#telefon').val(obj.phoneNumber);
            $('#email').val(obj.email);
        }
    }
}

$(function () {
    //init korpe
    cart.onCartPage = true;
    if (cart.cart.length !== 0) {
        $('.cart-has-items').removeClass('d-none');
        $('#cart-has-no-items').addClass('d-none');
    } else {
        $('.cart-has-items').addClass('d-none');
        $('#cart-has-no-items').removeClass('d-none');
    }

    //init forme
    let buyForm = new BuyForm();
    buyForm.getSavedInputs();

    $('#name').blur((event) => {
        buyForm.validateIme();
    });

    $('#ulica_i_broj').blur((event) => {
       buyForm.validateAdresa();
    });

    $('#postanski_broj').blur((event) => {
        buyForm.validatePostanskiBroj();
    });

    $('#mesto').blur((event) => {
        buyForm.validateMesto();
    });

    $('#telefon').blur((event) => {
        buyForm.validateTelefon();
    });

    $('#email').blur((event) => {
        buyForm.validateEmail();
    });

    $('#drzava').change((event) => {
        buyForm.validateDrzava();
    });

    $('#drzava_manual').blur((event) => {
        buyForm.validateDrzavaManual();
    });

    $('#buy-form').on('reset', (event) => {
        $('.invalid-feedback').addClass('d-none');
        $('.form-control').removeClass('is-valid');
        $('.form-control').removeClass('is-invalid');
        window.localStorage.removeItem('saved_inputs');
    });

    $('#buy-form').on('submit', (event) => {
        event.preventDefault();
        if (buyForm.isValid()) {
            $('#success-kupovina').removeClass('d-none');
            localStorage.clear('cart');
            cart = new Cart();
            cart.loadCartPage();
            buyForm.saveInputs();
        }
    });
})