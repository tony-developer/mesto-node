class FormValidator {
    constructor(form, messages) {
        this.form = form;
        this.messages = messages;
        this.inputs = Array.from(this.form.querySelectorAll('.popup__input'));
        this.button = this.form.querySelector('.popup__button');
        this.setEventListeners = this.setEventListeners.bind(this);
    }

    // слушатель полей ввода
    setEventListeners() {
        this.inputs.forEach(el => {
            el.addEventListener('input', () => {
                this.checkInputValidity(el);
                this.setSubmitButtonStates();
            });
        });
    }
    checkInputValidity(input) {
        const errorMessages = {
            emptyField: 'Это обязательное поле',
            customValidityLength: 'Должно быть от 2 до 30 символов',
            wrongUrl: 'Здесь должна быть ссылка',
        }

        this.input = input;
        this.errorElement = this.form.querySelector(`#error-${this.input.id}`);

        if (this.input.validity.valueMissing) {
            this.setInvalid(errorMessages.emptyField);
            return false;
        }
        if ((this.input.type === 'text') && (!this.input.validity.valid)) {
            this.setInvalid(this. messages.customValidityLength);
            return false;
        }
        if ((this.input.type === 'url') && (!this.input.validity.valid)) {
            this.setInvalid(this.messages.wrongUrl);
            return false;
        }
        this.setValid();
        return true;
    }

    setInvalid(message) {
        this.errorElement.textContent = message;
        this.input.classList.add('popup__input_invalid');
    }

    setValid() {
        this.errorElement.textContent = '';
        this.input.classList.remove('popup__input_invalid');
    }

    clearError() {
        this.form.querySelectorAll('.error').forEach(function (elem) {
            elem.textContent = '';

        });
        this.form.querySelectorAll('.popup__input_invalid').forEach(() => {
            this.input.classList.remove('popup__input_invalid');
        })

    };

    // активная/неактивная кнопка формы в зависимости от статуса полей ввода
    setSubmitButtonStates() {
        let inputsStatus = this.inputs.some(el => el.classList.contains('popup__input_invalid') || el.validity.valueMissing);
        if (inputsStatus) {
            this.button.setAttribute('disabled', true);
            this.button.classList.add(`popup__button_invalid`);
        } else {
            this.button.removeAttribute('disabled');
            this.button.classList.remove(`popup__button_invalid`);
        }
    }
}