'use strict';
(function() {

    const errorMessages = {
    emptyField: 'Это обязательное поле',
    customValidityLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка',
}

    const popupNew = new Popup(document.querySelector('#popup-new'))
    const popupProfile = new Popup(document.querySelector('#popup-edit'))
    const popupImage = new PopupImage(document.querySelector('#popup-image'))

    const validEdit = new FormValidator(document.forms.edit, errorMessages)
    const validNew = new FormValidator(document.forms.new, errorMessages)
    const apiServer = new Api({
        baseUrl: 'https://nomoreparties.co/cohort12',
        headers: {
            authorization: 'c0ae555e-c51e-4a02-ac33-fcd4cc7f259e',
            'Content-type': 'application/json'
        }
    })
    const userInfo = new UserInfo(document.forms.edit, document.querySelector('.user-info__name'),
        document.querySelector('.user-info__job'), apiServer)
    const cardList =
        new CardList(document.querySelector('.places-list'),
            apiServer,
            function renderCards(name, link) {
                return new Card(name, link,
                    function openImage(url) {
                        popupImage.open(url);
                    });
            })

    cardList.render()
    userInfo.loadUserInfo()


document.querySelector('.user-info__button').addEventListener('click', function () {
    popupNew.open();
    document.forms.new.reset();
    validNew.clearError();
    validNew.setEventListeners()
    validNew.setSubmitButtonStates();
});

document.querySelector('.user-info__button-edit').addEventListener('click', function () {
    validEdit.clearError();
    validEdit.setEventListeners()
    validEdit.setSubmitButtonStates()
    popupProfile.open();
});

document.forms.new.addEventListener('submit', function (event) {
    event.preventDefault();
    cardList.addCard(document.forms.new.elements.name.value, document.forms.new.elements.link.value);
    popupNew.close();
    document.forms.new.reset();
});

document.forms.edit.addEventListener('submit', function (event) {
    event.preventDefault();

    const userName = event.target.querySelector('#user-name').value,
        userData = event.target.querySelector('#about').value
    apiServer.patchProfile(userName, userData)
        .then((data) => {
        userInfo.updateUserInfo(data)
        popupProfile.close()
    })
        .catch((err) => {
            alert(err)
        })
});

})()


