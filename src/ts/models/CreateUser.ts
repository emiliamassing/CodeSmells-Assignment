class CreateUser{
    constructor(
        public name: string,
        public birthday: Date,
        public email: string,
        public password: string,
    ){}
};

export default CreateUser;