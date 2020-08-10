import axios from '../custom-axios/ample-axios';

class AuthenticationRepository {

    loginUser(data: any) {
        return axios.post('/login', data);
    }

    registerUser(username: string, password: string, email: string) {
        return axios.post(`/auth/register`, {
            "username": username,
            "password": password,
            "email": email
        });
    }

    getActiveUser() {
        return axios.get("/user/active");
    }

    activeUserLogout() {
        return axios.post("/logout");
    }

}

export default new AuthenticationRepository();