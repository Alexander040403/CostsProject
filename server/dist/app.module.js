"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const MongooseConfigService_1 = require("./config/MongooseConfigService");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const costs_module_1 = require("./costs/costs.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: MongooseConfigService_1.MongooseConfigService,
            }),
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            costs_module_1.CostsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map