class UserInfo{
    constructor(form, userName, userData, api){
        this.userName = userName;
        this.userData = userData;
        this.form = form;
        this.api = api;
        this.id = null;
    }

    setUserInfo(){
       this.form.username.value = this.userName.textContent;
       this.form.about.value = this.userData.textContent;
    }

    updateUserInfo(data){
        this.userName.textContent = data.name
        this.userData.textContent = data.about;
    }

    loadUserInfo() {
        this.api.getProfile()
        .then((data) => {
            const {_id} = data
            this.id = _id
            this.userName.textContent = data.name
            this.userData.textContent = data.about
        })
        .catch((err) => {
            console.log(err)
        })
    }

}

