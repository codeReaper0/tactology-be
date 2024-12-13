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
const bcrypt = require("bcrypt");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
const guard_service_1 = require("../../guard/guard.service");
let AuthService = class AuthService {
    constructor(userService, guardService) {
        this.userService = userService;
        this.guardService = guardService;
    }
    async register(registerUserDto) {
        const { firstName, lastName, email, password, phoneNumber } = registerUserDto;
        const userEmail = email.toLowerCase();
        const newUser = new user_entity_1.User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = userEmail;
        newUser.password = await this.hashPassword(password);
        newUser.phoneNumber = phoneNumber;
        const savedUser = await this.userService.create(newUser);
        const payload = {
            id: savedUser.id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
        };
        const accessToken = this.guardService.generateToken(payload);
        return {
            accessToken,
        };
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const userEmail = email.toLowerCase();
        const user = await this.userService.findOneByEmail(userEmail);
        if (!user) {
            throw new common_1.UnauthorizedException('Incorrect email or password');
        }
        const valid = await this.comparePassword(password, user.password);
        if (!valid) {
            throw new common_1.UnauthorizedException('Incorrect email or password');
        }
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        const accessToken = this.guardService.generateToken(payload);
        return {
            accessToken,
        };
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    async comparePassword(suppliedPassword, storedPassword) {
        const isMatch = await bcrypt.compare(suppliedPassword, storedPassword);
        return isMatch;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        guard_service_1.GuardService])
], AuthService);
//# sourceMappingURL=auth.service.js.map