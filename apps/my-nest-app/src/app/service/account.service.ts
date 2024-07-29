import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAccount } from '../interface/account.interface';
import { CreateAccountDto } from '../dto/create-account.dto';
@Injectable()
export class AccountService {
  constructor(@InjectModel('Account') private accountModel: Model<IAccount>) {}
  async createAccount(createAccountDto: CreateAccountDto): Promise<IAccount> {
    const newAccount = await new this.accountModel(createAccountDto);
    return newAccount.save();
  }

  async getAccount(accountId: string): Promise<IAccount> {
    const existingAccount = await this.accountModel.findById(accountId).exec();
    if (!existingAccount) {
      throw new NotFoundException(`Account #${accountId} not found`);
    }
    return existingAccount;
  }
}
