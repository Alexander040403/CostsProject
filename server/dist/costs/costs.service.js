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
exports.CostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_decorators_1 = require("@nestjs/mongoose/dist/common/mongoose.decorators");
const mongoose_1 = require("mongoose");
const costs_schema_1 = require("../schemas/costs.schema");
let CostsService = class CostsService {
    costsModel;
    constructor(costsModel) {
        this.costsModel = costsModel;
    }
    async findAll() {
        return this.costsModel.find();
    }
    async findOne(id) {
        return this.costsModel.findOne({ _id: id });
    }
    async create(createCostDto) {
        const createdCost = new this.costsModel(createCostDto);
        return createdCost.save();
    }
    async update(updateCostDto, id) {
        await this.costsModel.updateOne({ _id: id }, {
            $set: {
                ...updateCostDto,
            },
        });
        return this.findOne(id);
    }
    async delete(id) {
        await this.costsModel.deleteOne({ _id: id });
    }
};
exports.CostsService = CostsService;
exports.CostsService = CostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_decorators_1.InjectModel)(costs_schema_1.Cost.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CostsService);
//# sourceMappingURL=costs.service.js.map