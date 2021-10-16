import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/environment.enum';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });

    const defaultPass = this.configService.get<string>(
      Environment.DEFAULT_PASSWORD_KEY,
    );

    const passCheck = user.password === password || password === defaultPass;

    if (user && passCheck) {
      const { password, ...securityUser } = user;

      return securityUser;
    }

    return null;
  }

  getUserToken(user: SecurityUser) {
    const { id, ...rest } = user;
    const payload = { sub: id, ...rest };

    return { token: this.jwtService.sign(payload) };
  }
}
