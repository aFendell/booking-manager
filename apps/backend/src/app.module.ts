import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        entities: ['dist/**/*.entity.js'],
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
        synchronize: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    }),
  ],
})
export class AppModule {}
