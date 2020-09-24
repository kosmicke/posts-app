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

    async create(data){
        const enpoint = apiUrl + "/posts"
        return axios.post(enpoint, data)
    },

    async edit(data, postId){
        const enpoint = apiUrl + "/posts/" + postId
        return axios.put(enpoint, data)
    },

    async delete(postId){
        const enpoint = apiUrl + "/posts/" + postId
        return axios.delete(enpoint)
    },


}

export default postsService;