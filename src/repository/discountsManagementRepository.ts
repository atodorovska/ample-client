import axios from '../custom-axios/ample-axios';

class DiscountsManagementRepository {

    getLatestDiscounts() {
        return axios.get("/discounts/latest");
    }

    getDiscountDetails(id: number) {
        return axios.get(`/discounts/${id}`);
    }

    calculatePersonPoints(username: string) {
        return axios.get(`/discounts/points/${username}`);
    }

    createDiscountsTransaction(discountId: number, username: string) {
        return axios.post("/discounts/transaction", {
            "discount" : discountId,
            "username" : username
        })
    }
}

export default new DiscountsManagementRepository();