import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDTO } from './login.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  fazerLogin(@Body() loginDto: LoginDTO) {
    return this.authService.fazerLogin(loginDto.email, loginDto.senha, loginDto.funcao);
  }

  @UseGuards(AuthGuard)
  @Get('perfil')
  getPerfil(@Request() req: any) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  sairPerfil(@Request() req: any) {
    return req.user;
  }
}
