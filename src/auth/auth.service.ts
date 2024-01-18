import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.model';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    this.logger.log(`Attempting login for user: ${loginDto.username}`);

    const user = await User.query().findOne({ username: loginDto.username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.username, user.id);

    this.logger.log(`Login successful for user: ${loginDto.username}`);
    return { accessToken };
  }

  private async generateAccessToken(
    username: string,
    userId: number,
  ): Promise<string> {
    const payload = { username, sub: userId };
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    return this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: '30m',
    });
  }
}
