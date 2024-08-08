import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateAccountDto } from '../dto/create-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('signup')
  async createAccount(
    @Res() response,
    @Body() createAccountDto: CreateAccountDto
  ) {
    try {
      const newAccount = await this.authService.createAccount(createAccountDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Account has been created successfully',
        newAccount,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Account not created!',
        error: 'Bad Request',
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
