import * as axios from "axios";

var instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
});

export default instance;