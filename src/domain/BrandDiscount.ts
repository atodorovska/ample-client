class BrandDiscount{
    id: number;
    name: string;
    photo: string;
    discount: number;
    points: number;


    constructor(id: number, name: string, photo: string, discount: number, points: number) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.discount = discount;
        this.points = points;
    }
}

export default BrandDiscount;
