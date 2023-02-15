interface ICreateUser{
    name: string,
    birthday: Date,
    email: string,
    password: string,
    adress?: string,
    avatar?: string,
};

export default ICreateUser;