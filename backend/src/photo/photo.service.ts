import { Injectable } from '@nestjs/common';
import { readFile, writeFile, unlink } from 'fs/promises';
import { PacientService } from '../pacient/pacient.service';
import { UploadPhotoDTO } from './dto/upload-photo.dto';
import { ReplacePhotoDTO } from './dto/replace-photo.dto';
import { join } from 'path';

@Injectable()
export class PhotoService {
  private uploadPath: string;
  private uploadTestPath: string;
  constructor(private readonly pacientService: PacientService) {
    this.uploadPath = '../../uploads/';
    this.uploadTestPath = '../../uploads/test/';
  }

  async readPhoto(fileName: string, test?: boolean) {
    try {
      if (test) {
        return await readFile(join(__dirname, this.uploadTestPath, fileName));
      }

      return await readFile(join(__dirname, this.uploadPath, fileName));
    } catch (err) {
      console.log(err);
    }
  }
  async uploadPhoto({
    fileName,
    photo,
    test,
  }: UploadPhotoDTO & { test?: boolean }) {
    try {
      if (test) {
        await writeFile(
          join(__dirname, this.uploadTestPath, fileName),
          photo.buffer,
        );
      }

      await writeFile(join(__dirname, this.uploadPath, fileName), photo.buffer);
    } catch (err) {
      console.log(err);
    }
  }

  async getPhotoOfUser(pacientId: string) {
    try {
      const pacientFounded = await this.pacientService.findOneById(pacientId);

      return this.uploadPath + pacientFounded.photoProfile;
    } catch (err) {
      console.log(err);
    }
  }

  async removePhoto(fileName: string) {
    try {
      return unlink(join(__dirname, this.uploadPath, fileName));
    } catch (err) {
      console.log(err);
    }
  }

  async replacePhoto({ fileName, photo }: ReplacePhotoDTO) {
    try {
      await writeFile(join(__dirname, this.uploadPath, fileName), photo.buffer);
    } catch (err) {
      console.log(err);
    }
  }
}
