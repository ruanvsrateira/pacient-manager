import { PacientService } from './pacient.service';
import { CreatePacientDTO } from './dto/create-pacient.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from 'src/photo/photo.service';
import { UpdatePacientDTO } from './dto/update-pacient.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  ParseUUIDPipe,
  Put,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';

@Controller('pacient')
export class PacientController {
  constructor(
    private readonly pacientService: PacientService,
    private readonly photoService: PhotoService,
  ) {}

  @Get()
  async findAll() {
    return this.pacientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.pacientService.findOneById(id);
  }

  @UseInterceptors(FileInterceptor('photo'))
  @Post()
  async create(
    @Body() data: CreatePacientDTO,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const pacientCreated = await this.pacientService.create({
      ...data,
      photoExtension: photo.mimetype.replace('image/', ''),
    });

    await this.photoService.uploadPhoto({
      fileName: pacientCreated.photoProfile,
      photo,
    });

    return { pacientCreated };
  }

  @Delete(':id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const pacientDeleted = await this.pacientService.delete(id);

    await this.photoService.removePhoto(pacientDeleted.photoProfile);

    return pacientDeleted;
  }

  @UseInterceptors(FileInterceptor('photo'))
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdatePacientDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    photo?: Express.Multer.File,
  ) {
    const pacientUpdated = await this.pacientService.update(id, data);

    if (photo) {
      await this.photoService.replacePhoto({
        fileName: pacientUpdated.photoProfile,
        photo,
      });
    }

    return pacientUpdated;
  }
}
