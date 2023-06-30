import { IsString, IsEnum } from 'class-validator';
import { PACIENT_SEX } from 'src/enums/pacient-sex.enum';

export class CreatePacientDTO {
  @IsString()
  name: string;

  @IsString()
  age: number;

  @IsEnum(PACIENT_SEX)
  sex: PACIENT_SEX;

  @IsString()
  cityBorn: string;

  @IsString()
  preServiceDescription: string;

  photoExtension: string;
}
