import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErsModule } from './ers/ers.module';
import { ErsController } from './ers/ers.controller';
import { ErsService } from './ers/ers.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ErsModule,
    TypegooseModule.forRoot('mongodb://localhost:27017/ersApi'),
  ],
  controllers: [AppController, ErsController],
  providers: [AppService],
})
export class AppModule {}
