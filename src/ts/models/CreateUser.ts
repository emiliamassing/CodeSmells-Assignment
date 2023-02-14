class CreateUser{
    name: string;
    birthday: Date;
    email: string;
    password: string;

    constructor(name: string, birthday: Date, email: string, password: string){
        this.name = name;
        this.birthday = birthday;
        this.email = email;
        this.password = password;
    }
};

export default CreateUser;