import { Document } from 'mongoose';
export interface IAccount extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly accessToken: string;
  readonly forgotPasswordAccessToken: number;
  readonly forgotPasswordExpiresIn: Date;
}
