import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  fazerLogin(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @Get('perfil')
  getPerfil(@Request() req: any) {
    return req.user;
  }

  @Get('logout')
  sairPerfil(@Request() req: any) {
    return req.user;
  }
}
