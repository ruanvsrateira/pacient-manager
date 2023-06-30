import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PhotoService } from './photo.service';
import { join } from 'path';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get('/pacient/:id')
  async getPhoto(@Param('id') id: string, @Res() res: Response) {
    try {
      const pathPhoto = await this.photoService.getPhotoOfUser(id);
      return res.sendFile(join(__dirname, pathPhoto));
    } catch (err) {
      throw new BadRequestException(
        `Failed to retrieve photo for user ID ${id}`,
      );
    }
  }
}
