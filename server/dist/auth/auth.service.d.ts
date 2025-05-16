import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { User } from 'src/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    usersModel: any;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string): Promise<User | null>;
    generateAccessToken(user: User): Promise<{
        access_token: string;
    }>;
    generateRefreshToken(userId: string): Promise<{
        refresh_token: string;
    }>;
    verifyToken(token: string): any;
    parseJwt(token: string): any;
    getUserByTokenData(token: string): Promise<User | null>;
}
