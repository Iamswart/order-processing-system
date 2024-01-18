import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await User.query().findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found or token invalid');
    }

    const role = await Role.query().findById(user.roleId);
    if (!role) {
      throw new UnauthorizedException('Role not found for the user');
    }

    return { userId: user.id, username: user.username, role: role.name };
  }
}
