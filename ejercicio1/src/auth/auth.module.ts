import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'mi_secreto',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [JwtStrategy, AuthService],
    controllers: [AuthController],
    exports: [JwtModule],
})
export class AuthModule {}
