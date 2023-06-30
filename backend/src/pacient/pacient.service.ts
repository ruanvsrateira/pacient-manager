import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PacientEntity } from './pacient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePacientDTO } from './dto/create-pacient.dto';
import { UpdatePacientDTO } from './dto/update-pacient.dto';

@Injectable()
export class PacientService {
  constructor(
    @InjectRepository(PacientEntity)
    private readonly repository: Repository<PacientEntity>,
  ) {}

  async findAll() {
    return this.repository.find({});
  }

  async create(data: CreatePacientDTO) {
    if (!(await this.repository.findOne({ where: { name: data.name } }))) {
      const pacientCreated = await this.repository.save(data);
      return await this.repository.save({
        ...pacientCreated,
        photoProfile: `${pacientCreated.id}.${data.photoExtension}`
      });
    }

    throw new BadRequestException('Name already used by another pacient!');
  }

  async findOneById(id: string) {
    const userFounded = await this.repository.findOne({ where: { id } });

    if (!userFounded) {
      throw new NotFoundException('Pacient not founded by this id');
    }

    return userFounded;
  }

  async findOneByName(name: string) {
    const userFounded = await this.repository.findOne({ where: { name } });

    if (!userFounded) {
      throw new NotFoundException('Pacient not founded by this id');
    }

    return userFounded;
  }

  async delete(id: string) {
    const pacientDeleted = await this.repository.findOne({ where: { id } });

    if (!pacientDeleted) {
      throw new NotFoundException('Pacient not founded by this id');
    }

    await this.repository.delete(id);

    return pacientDeleted;
  }

  async update(id: string, data: UpdatePacientDTO) {
    const pacientFoundedById = await this.repository.findOne({ where: { id } });
    const pacientFoundedByName = await this.repository.findOne({
      where: { name: data.name },
    });

    if (!pacientFoundedById) {
      throw new NotFoundException('Pacient not founded by this id');
    }

    if (pacientFoundedByName) {
      if (pacientFoundedByName.id !== pacientFoundedById.id) {
        throw new BadRequestException('Pacient already use this name');
      }
    }

    await this.repository.update(id, data);

    return await this.repository.findOne({ where: { id } });
  }
}
