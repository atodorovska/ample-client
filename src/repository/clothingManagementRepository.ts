import axios from '../custom-axios/ample-axios';

class ClothingManagementRepository {

    getLatestClothingItems() {
        return axios.get("/clothing/latest");
    }

    shareClothingItem(name: string, description: string, category: string, size: string, price: number, photo: string) {
        return axios.post("/clothing/item/post", {
            "name": name,
            "description": description,
            "category": category,
            "size": size,
            "price": price,
            "photo": photo
        });
    }

    shareClothingItemPhoto(data: any) {
        return axios.post("/clothing/file?file=", data);
    }
}

export default new ClothingManagementRepository();