import { PACIENT_SEX } from '../enums/pacient-sex.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PacientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  age: number;

  @Column({ enum: PACIENT_SEX })
  sex: PACIENT_SEX;

  @Column({ name: 'city_born' })
  cityBorn: string;

  @Column({ name: 'pre_service_description' })
  preServiceDescription: string;

  @Column({ name: 'photo_profile', nullable: true })
  photoProfile: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
