import { Module, forwardRef } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PacientModule } from 'src/pacient/pacient.module';

@Module({
  imports: [forwardRef(() => PacientModule)],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
