/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Body,
  Post,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './auth.service';
import { RefreshJWTGuard } from './guards/refresh-jwt.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.usersService.login(loginUserDto);

    if (!user) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Неверные учетные данные' });
      return;
    }

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(
      user._id as string,
    );

    res.statusCode = HttpStatus.OK;
    return res.send({ ...access, ...refresh, username: user.username });
  }

  @UseGuards(RegistrationGuard)
  @Post('registration')
  async registrationUser(
    @Body() CreateUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    await this.usersService.registration(CreateUserDto);

    res.statusCode = HttpStatus.CREATED;
    return res.send('user created');
  }

  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    const validToken = this.authService.verifyToken(
      refreshTokenDto.refresh_token,
    );
    const user = await this.usersService.findOne(refreshTokenDto.username);

    if (!user) {
      return null;
    }

    const access = await this.authService.generateAccessToken(user);

    if (validToken?.error) {
      if (validToken?.error === 'jwt expired') {
        const refresh = await this.authService.generateRefreshToken(
          user._id as string,
        );

        res.statusCode = HttpStatus.OK;
        return res.send({ ...access, ...refresh });
      } else {
        res.statusCode = HttpStatus.BAD_REQUEST;
        return res.send({ error: validToken?.error });
      }
    } else {
      res.statusCode = HttpStatus.OK;
      return res.send({
        ...access,
        refresh_token: refreshTokenDto.refresh_token,
      });
    }
  }
}
