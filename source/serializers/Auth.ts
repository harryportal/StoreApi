import { IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

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

class Profile {
    @IsString()
    @Length(2, 25)
    firstname: string

    @IsString()
    @Length(2, 25)
    lastname: string

    @IsString()
    @Length(2, 50)
    address: string

    @IsString()
    @IsOptional()
    imageUrl?: string

    @IsString()
    userId: string
}

export {SignUp, SignIn, Profile}
