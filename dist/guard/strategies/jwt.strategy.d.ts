import { Strategy } from 'passport-jwt';
import { Payload } from '@/resources/auth/types/types';
import { UserService } from '@/resources/user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: Payload): Promise<import("../../resources/user/entities/user.entity").User>;
}
export {};
