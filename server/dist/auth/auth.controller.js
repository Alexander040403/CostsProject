"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const registration_guard_1 = require("./guards/registration.guard");
const login_user_dto_1 = require("./dto/login-user.dto");
const login_guard_1 = require("./guards/login.guard");
const auth_service_1 = require("./auth.service");
const refresh_jwt_guard_1 = require("./guards/refresh-jwt.guard");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
let AuthController = class AuthController {
    usersService;
    authService;
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async loginUser(loginUserDto, res) {
        const user = await this.usersService.login(loginUserDto);
        if (!user) {
            res
                .status(common_1.HttpStatus.UNAUTHORIZED)
                .json({ message: 'Неверные учетные данные' });
            return;
        }
        const access = await this.authService.generateAccessToken(user);
        const refresh = await this.authService.generateRefreshToken(user._id);
        res.statusCode = common_1.HttpStatus.OK;
        return res.send({ ...access, ...refresh, username: user.username });
    }
    async registrationUser(CreateUserDto, res) {
        await this.usersService.registration(CreateUserDto);
        res.statusCode = common_1.HttpStatus.CREATED;
        return res.send('user created');
    }
    async refreshToken(refreshTokenDto, res) {
        const validToken = this.authService.verifyToken(refreshTokenDto.refresh_token);
        const user = await this.usersService.findOne(refreshTokenDto.username);
        if (!user) {
            return null;
        }
        const access = await this.authService.generateAccessToken(user);
        if (validToken?.error) {
            if (validToken?.error === 'jwt expired') {
                const refresh = await this.authService.generateRefreshToken(user._id);
                res.statusCode = common_1.HttpStatus.OK;
                return res.send({ ...access, ...refresh });
            }
            else {
                res.statusCode = common_1.HttpStatus.BAD_REQUEST;
                return res.send({ error: validToken?.error });
            }
        }
        else {
            res.statusCode = common_1.HttpStatus.OK;
            return res.send({
                ...access,
                refresh_token: refreshTokenDto.refresh_token,
            });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.UseGuards)(registration_guard_1.RegistrationGuard),
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registrationUser", null);
__decorate([
    (0, common_1.UseGuards)(refresh_jwt_guard_1.RefreshJWTGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map