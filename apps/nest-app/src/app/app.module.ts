import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), AuthModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
