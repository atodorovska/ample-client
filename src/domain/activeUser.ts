class ActiveUser{
   username: string;
   email: string;
   role: string;
   points: number;
   address: string;
   phoneNumber: string;

   constructor(username: string, email: string, role: string, points: number, address: string, phoneNumber: string) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.points = points;
        this.address = address;
        this.phoneNumber = phoneNumber;
   }
}

export default ActiveUser;