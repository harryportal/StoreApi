import { IsDefined, IsEmail, Length } from "class-validator";

class SignIn{
    @IsEmail()
    email: string
    @Length(5, 20)
    password: string
}

class SignUp extends SignIn{
    @IsDefined()
    username: string
}

export {SignUp, SignIn}
