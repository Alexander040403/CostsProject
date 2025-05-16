import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    loginUser(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    registrationUser(CreateUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(refreshTokenDto: RefreshTokenDto, res: Response): Promise<Response<any, Record<string, any>> | null>;
}
