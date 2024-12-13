import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Payload } from '@/resources/auth/types/types';

@Injectable()
export class GuardService {
  constructor(private readonly jwtService: JwtService) {}

  public generateToken(payload: Payload): string {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  public verifyToken(token: string): Payload | null {
    const decoded = this.jwtService.verify(token);
    return decoded as Payload;
  }
}
