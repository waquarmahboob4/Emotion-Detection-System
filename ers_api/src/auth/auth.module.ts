import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ErsModule } from '../ers/ers.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    ErsModule,
    PassportModule,
    // .register({
    //   session: true,
    // }),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
