class ActiveUser{
   username: string;
   email: string;
   role: string;
   points: number;
   address: string;

   constructor(username: string, email: string, role: string, points: number, address: string) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.points = points;
        this.address = address;
   }
}

export default ActiveUser;