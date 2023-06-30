import { Module, forwardRef } from '@nestjs/common';
import { PacientService } from './pacient.service';
import { PacientController } from './pacient.controller';
import { PacientEntity } from './pacient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  imports: [
    forwardRef(() => PhotoModule),
    TypeOrmModule.forFeature([PacientEntity]),
  ],
  providers: [PacientService],
  controllers: [PacientController],
  exports: [PacientService],
})
export class PacientModule {}
