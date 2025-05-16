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
exports.RefreshJWTGuard = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
let RefreshJWTGuard = class RefreshJWTGuard {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { refresh_token, username } = request.body;
        if (!refresh_token) {
            throw new common_1.UnauthorizedException('Поле refresh_token обязательно');
        }
        if (!username) {
            throw new common_1.UnauthorizedException('Поле username обязательно');
        }
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new common_1.UnauthorizedException('Пользователя не существует');
        }
        return true;
    }
};
exports.RefreshJWTGuard = RefreshJWTGuard;
exports.RefreshJWTGuard = RefreshJWTGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], RefreshJWTGuard);
//# sourceMappingURL=refresh-jwt.guard.js.map