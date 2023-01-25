import { Module, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { ErsService } from './ers.service';
import { ErsController } from './ers.controller';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { ApiUser } from './ers.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';

const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(
      new HttpException(
        `Unsupported file type ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  cb(null, true);
};

@Module({
  imports: [
    ErsModule,
    // PassportModule,
    // // .register({
    // //   session: true,
    // // }),
    // JwtModule.register({
    //   secret: 'SECRET',
    //   signOptions: { expiresIn: '3600s' },
    // }),
    TypegooseModule.forFeature([
      {
        typegooseClass: ApiUser,
        schemaOptions: { versionKey: false },
      },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        fileFilter: imageFilter,
      }),
    }),
  ],
  controllers: [ErsController],
  providers: [ErsService, JwtService, AuthService, LocalStrategy, JwtStrategy],
  exports: [ErsService],
})
export class ErsModule {}
