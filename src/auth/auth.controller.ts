import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CustomerAuthGuard } from './guards/customer-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'This route Post to login' })
  @ApiBody({
    description: 'Data to login',
    schema: {
      example: {
        username: 'joao.silva@email.com',
        password: '123456',
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(CustomerAuthGuard)
  @Post('login/customer')
  @ApiOperation({ summary: 'This route Post to login' })
  @ApiBody({
    description: 'Data to login',
    schema: {
      example: {
        username: '+351 987654321',
        password: '123456',
      },
    },
  })
  async loginCustomer(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  @ApiOperation({ summary: 'This route Post to login with Google' })
  async googleLogin() {
    // Passport will automatically redirect the user to Google
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  @ApiOperation({ summary: 'This route Post to callback with Google' })
  async googleCallback(@Request() req) {
    // Returns user data after authentication with Google
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
