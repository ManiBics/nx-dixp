import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Account {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  accessToken: string;
  @Prop()
  forgotPasswordAccessToken: number;
  @Prop()
  forgotPasswordExpiresIn: Date;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
