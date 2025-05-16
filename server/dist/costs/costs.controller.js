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
exports.CostsController = void 0;
const common_1 = require("@nestjs/common");
const costs_service_1 = require("./costs.service");
const auth_service_1 = require("../auth/auth.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const create_cost_dto_1 = require("./dto/create-cost.dto");
const update_cost_dto_1 = require("./dto/update-cost.dto");
let CostsController = class CostsController {
    costsService;
    authService;
    constructor(costsService, authService) {
        this.costsService = costsService;
        this.authService = authService;
    }
    async getAllCosts(req, res) {
        const token = req.token;
        const user = await this.authService.getUserByTokenData(token);
        if (!user) {
            return res
                .status(common_1.HttpStatus.UNAUTHORIZED)
                .json({ message: 'Неправильный или устаревший токен' });
        }
        const costs = await this.costsService.findAll();
        const filteredCosts = costs.filter((cost) => cost.userId === user._id.toString());
        return res.send(filteredCosts);
    }
    async createCost(createCostDto, req) {
        const user = await this.authService.getUserByTokenData(req.token);
        if (!user) {
            return null;
        }
        return await this.costsService.create({
            ...createCostDto,
            userId: user._id,
        });
    }
    async updateCost(updateCostDto, id) {
        return await this.costsService.update(updateCostDto, id);
    }
    async deleteCost(id) {
        return await this.costsService.delete(id);
    }
};
exports.CostsController = CostsController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CostsController.prototype, "getAllCosts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cost_dto_1.CreateCostDto, Object]),
    __metadata("design:returntype", Promise)
], CostsController.prototype, "createCost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_cost_dto_1.UpdateCostDto, String]),
    __metadata("design:returntype", Promise)
], CostsController.prototype, "updateCost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CostsController.prototype, "deleteCost", null);
exports.CostsController = CostsController = __decorate([
    (0, common_1.Controller)('cost'),
    __metadata("design:paramtypes", [costs_service_1.CostsService,
        auth_service_1.AuthService])
], CostsController);
//# sourceMappingURL=costs.controller.js.map