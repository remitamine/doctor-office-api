import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('DOCTOR_SECRET'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  exports: [JwtModule, ConfigModule],
})
export class AuthModule {}
