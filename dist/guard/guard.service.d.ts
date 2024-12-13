import { JwtService } from '@nestjs/jwt';
import { Payload } from '@/resources/auth/types/types';
export declare class GuardService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(payload: Payload): string;
    verifyToken(token: string): Payload | null;
}
