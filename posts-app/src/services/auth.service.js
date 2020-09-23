import axios from 'axios';

const apiUrl = "https://kosmic-forum-api.herokuapp.com";

const authService = {

    async sendLogin(data){
        let endpoint = apiUrl + "/auth/sign-in";
        return axios.post(endpoint, data)
    },

    setLoggedUser(userData){
        try {
            let parsedData = JSON.stringify(userData)
            localStorage.setItem("user", parsedData)
        } catch (error) {
            console.log(error)
        }
    },

    getLoggedUser(){
        try {
            let userData = localStorage.getItem("user")
            if(!userData) return null;
            let parsedData = JSON.parse(userData)
            return parsedData;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    clearLoggedUser(){
        localStorage.clear()
    }

}

export default authService;