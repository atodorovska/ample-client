import axios from '../custom-axios/ample-axios';

class DiscountsManagementRepository {

    getLatestDiscounts() {
        return axios.get("/discounts/latest");
    }
}

export default new DiscountsManagementRepository();