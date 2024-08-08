import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAccount } from '../interface/account.interface';
import { CreateAccountDto } from '../dto/create-account.dto';
import { Account } from '../schema/account.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Account.name) private accountModel: Model<IAccount>
  ) {}

  async signIn(email: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.accountModel.findOne({ email }).lean();
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async createAccount(createAccountDto: CreateAccountDto): Promise<IAccount> {
    const newAccount = await new this.accountModel(createAccountDto);
    return newAccount.save();
  }
}
