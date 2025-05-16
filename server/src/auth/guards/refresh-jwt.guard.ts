/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshJWTGuard implements CanActivate {
  constructor(private usersService: UsersService) {}
  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const {refresh_token, username} = request.body;

    if (!refresh_token) {
        throw new UnauthorizedException('Поле refresh_token обязательно');
    }

    if (!username) {
        throw new UnauthorizedException('Поле username обязательно');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const user = await this.usersService.findOne(username);

    if (!user) {
        throw new UnauthorizedException('Пользователя не существует');
    }
    
    return true;
  }
}