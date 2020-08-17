class BrandDiscount{
    id: number;
    name: string;
    photo: string;
    discount: number;
    description: string;
    points: number;


    constructor(id: number, name: string, photo: string, discount: number, description: string, points: number) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.discount = discount;
        this.description = description;
        this.points = points;
    }
}

export default BrandDiscount;
