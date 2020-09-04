import axios from '../custom-axios/ample-axios';

class ClothingManagementRepository {

    allClothingItems(category: string, size: string, current: number, items: number) {
        return axios.post("/clothing/all", {
            "category" : category,
            "size": size,
            "current" : current,
            "items" : items
        });
    }

    getLatestClothingItems() {
        return axios.get("/clothing/latest");
    }

    getClothingItemDetails(id: number) {
        return axios.get(`/clothing/${id}`);
    }

    getClothingItem(address: string, date: string, number: string, username: string, item: number){
        return axios.post("/clothing/item/get", {
            "address": address,
            "date": date,
            "number": number,
            "username": username,
            "item": item
        });
    }

    shareClothingItem(name: string, description: string, category: string, size: string, price: number, photo: string,
                      address: string, date: string, number: string, username: string) {
        return axios.post("/clothing/item/share", {
            "name": name,
            "description": description,
            "category": category,
            "size": size,
            "price": price,
            "photo": photo,
            "address": address,
            "date": date,
            "number": number,
            "username": username
        });
    }

    shareClothingItemPhoto(data: any) {
        return axios.post("/clothing/file?file=", data);
    }
}

export default new ClothingManagementRepository();