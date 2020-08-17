import axios from '../custom-axios/ample-axios';

class ProfileManagementRepository {

    editProfile(address: string, number: string, username: string) {
        return axios.post("/user/edit", {
            "address" : address,
            "number" : number,
            "username" : username
        })
    }

    addPointsForSurvey(username: string) {
        return axios.get(`/user/add-points/${username}`);
    }
}

export default new ProfileManagementRepository();