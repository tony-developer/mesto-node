class Api {
    constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.cardsUrl = '/cards';
    this.profileUrl = '/users/me'
    }


    getProfile() {
        return fetch(this.baseUrl + this.profileUrl, {
            method: 'GET',
            headers: this.headers,
         })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка ${res.status}` )
            })
    }

    getCards() {
        return fetch(this.baseUrl + this.cardsUrl, {
            method: 'GET',
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }

    patchProfile(name, about) {
        return fetch(this.baseUrl + this.profileUrl, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка ${res.status}`)
            })
    }
}