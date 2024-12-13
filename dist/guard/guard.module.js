"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const guard_service_1 = require("./guard.service");
const user_module_1 = require("../resources/user/user.module");
const app_environment_1 = require("../app.environment");
let GuardModule = class GuardModule {
};
exports.GuardModule = GuardModule;
exports.GuardModule = GuardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: app_environment_1.ENV.JWT_SECRET,
                signOptions: { expiresIn: '24h' },
            }),
        ],
        providers: [jwt_strategy_1.JwtStrategy, guard_service_1.GuardService],
        exports: [guard_service_1.GuardService],
    })
], GuardModule);
//# sourceMappingURL=guard.module.js.map