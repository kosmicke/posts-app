import axios from 'axios';

const apiUrl = "http://localhost:8000/api"

const postsService = {

    async list(){
        const enpoint = apiUrl + "/posts"
        return axios.get(enpoint)
    },

    async getOne(postId){
        const enpoint = apiUrl + "/posts/" + postId
        return axios.get(enpoint)
    },
}

export default postsService;