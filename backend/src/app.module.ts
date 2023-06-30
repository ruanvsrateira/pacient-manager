import { Module, OnModuleInit } from '@nestjs/common';
import { PacientModule } from './pacient/pacient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PhotoModule } from './photo/photo.module';
import { PacientEntity } from './pacient/pacient.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) as 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [PacientEntity],
      synchronize: true,
    }),
    PacientModule,
    PhotoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
