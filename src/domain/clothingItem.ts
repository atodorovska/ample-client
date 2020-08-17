class ClothingItem{
    id: number;
    name: string;
    description: string;
    category: string;
    size: string;
    price: number;
    photo: string;

    constructor(id: number, name: string, description: string, category: string, size: string, price: number, photo: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.size = size;
        this.price = price;
        this.photo = photo;
    }
}

export default ClothingItem;