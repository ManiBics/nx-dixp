import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/Employee'),
    AuthModule,
    UsersModule,
  ],
  providers: [UsersService],
})
export class AppModule {}
