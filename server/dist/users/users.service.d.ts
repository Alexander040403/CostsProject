import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { User, UsersDocument } from 'src/schemas/users.schema';
export declare class UsersService {
    private usersModel;
    [x: string]: any;
    constructor(usersModel: Model<UsersDocument>);
    login(loginUserDto: LoginUserDto): Promise<User | null>;
    registration(createUserDto: CreateUserDto): Promise<User | null>;
    findOne(username: string): Promise<User | null>;
}
