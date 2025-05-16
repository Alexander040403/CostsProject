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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("@nestjs/jwt/dist/jwt.service");
const users_service_1 = require("../users/users.service");
const constants_1 = require("./constants");
let AuthService = class AuthService {
    usersService;
    jwtService;
    usersModel;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username) {
        const user = await this.usersService.findOne(username);
        if (!user) {
            return null;
        }
        return user;
    }
    async generateAccessToken(user) {
        return {
            access_token: this.jwtService.sign({ user }),
        };
    }
    async generateRefreshToken(userId) {
        return {
            refresh_token: this.jwtService.sign({ userId }, { secret: constants_1.jwtConstants.secret, expiresIn: '30d' }),
        };
    }
    verifyToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (error) {
            return { error: error.message };
        }
    }
    parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64)
                .split('')
                .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
                .join(''));
            return JSON.parse(jsonPayload);
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
    async getUserByTokenData(token) {
        try {
            const parsedTokenData = this.parseJwt(token);
            if (!parsedTokenData.user || !parsedTokenData.user.username) {
                throw new Error('Invalid token structure');
            }
            return await this.usersService.findOne(parsedTokenData.user.username);
        }
        catch (error) {
            console.error(error.message);
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_service_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map