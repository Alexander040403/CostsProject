/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { User } from 'src/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  usersModel: any;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async generateAccessToken(user: User) {
    return {
      access_token: this.jwtService.sign({ user }),
    };
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async generateRefreshToken(userId: string) {
    return {
      refresh_token: this.jwtService.sign(
        { userId },
        { secret: jwtConstants.secret, expiresIn: '30d' },
      ),
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return { error: error.message };
    }
  }

  parseJwt(token: string) {
    // const base64Url = token.split('.')[1];
    // const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // const jsonPayload = decodeURIComponent(
    //   atob(base64)
    //     .split('')
    //     .map(function (c) {
    //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     })
    //     .join(''),
    // );
    // return JSON.parse(jsonPayload);

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );

      return JSON.parse(jsonPayload);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async getUserByTokenData(token: string): Promise<User | null> {
    try {
      const parsedTokenData = this.parseJwt(token);

      if (!parsedTokenData.user || !parsedTokenData.user.username) {
        throw new Error('Invalid token structure');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return await this.usersService.findOne(parsedTokenData.user.username);
    } catch (error) {
      console.error(error.message);
      return null; // or handle it as needed
    }
  }
}
