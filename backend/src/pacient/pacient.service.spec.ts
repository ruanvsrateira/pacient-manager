import { getRepositoryToken } from '@nestjs/typeorm';
import { PacientService } from './pacient.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PacientEntity } from './pacient.entity';
import { TestUtil } from '../utils/Test.util';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('Testing Pacient Service', () => {
  let service: PacientService;
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacientService,
        {
          provide: getRepositoryToken(PacientEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PacientService>(PacientService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });

  describe('Get All Pacients', () => {
    it('Should be return all pacients', async () => {
      const pacientsTest = TestUtil.giveMeValidPacients(3);
      mockRepository.find.mockReturnValue(pacientsTest);
      const pacients = await service.findAll();

      expect(pacients.length).toBe(3);
      expect(pacients).toBeDefined();
      expect(pacients).toMatchObject(pacients);
    });
  });

  describe('Get Pacient By Id', () => {
    it('Should be return one pacient', async () => {
      const pacientTest = TestUtil.giveMeValidPacient();
      mockRepository.findOne.mockReturnValue(pacientTest);
      const pacient = await service.findOneById('uuiv4-test');

      expect(pacient).toMatchObject(pacientTest);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should be return Not Founded Error', async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(service.findOneById('uuidv4-test')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get Pacient By Name', () => {
    it('Should be return one pacient', async () => {
      const pacientTest = TestUtil.giveMeValidPacient();
      mockRepository.findOne.mockReturnValue(pacientTest);
      const pacient = await service.findOneByName(
        'Ruan Victor dos Santos Rateira',
      );

      expect(pacient).toMatchObject(pacientTest);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should be return Not Founded Error', async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(
        service.findOneByName('Ruan Victor dos Santos Rateira'),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Create New Pacient', () => {
    it('Should be return new Pacient Registred', async () => {
      const pacientTest = TestUtil.giveMeValidPacient();
      mockRepository.save.mockReturnValue(pacientTest);
      const pacientCreated = await service.create({
        name: pacientTest.name,
        age: pacientTest.age,
        cityBorn: pacientTest.cityBorn,
        sex: pacientTest.sex,
        preServiceDescription: pacientTest.preServiceDescription,
        photoExtension: 'png',
      });

      expect(pacientCreated).toMatchObject(pacientTest);
      expect(pacientCreated).toBeDefined();
    });

    it('Should be return Bad Request Error', async () => {
      const pacientTest = TestUtil.giveMeValidPacient();
      mockRepository.findOne.mockReturnValue(pacientTest);

      expect(
        service.create({
          name: pacientTest.name,
          age: pacientTest.age,
          cityBorn: pacientTest.cityBorn,
          sex: pacientTest.sex,
          preServiceDescription: pacientTest.preServiceDescription,
          photoExtension: 'png',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete Pacient By Id', () => {
    it('Should be return one pacient deleted', async () => {
      const pacientTest = TestUtil.giveMeValidPacient();
      mockRepository.findOne.mockReturnValue(pacientTest);
      mockRepository.delete.mockReturnValue(pacientTest);
      const pacient = await service.delete('uuiv4-test');

      expect(pacient).toMatchObject(pacientTest);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('Should be return Not Founded Error', async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(service.findOneById('uuidv4-test')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing Update Pacient', () => {
    it('Should be return updated Pacient', async () => {
      const pacientTest = TestUtil.giveMeValidPacient();
      mockRepository.findOne
        .mockReturnValueOnce(pacientTest)
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(pacientTest);

      mockRepository.update.mockReturnValue(pacientTest);
      const pacientUpdated = await service.update('uuidv4-test', {
        name: pacientTest.name,
        age: pacientTest.age,
        cityBorn: pacientTest.cityBorn,
        sex: pacientTest.sex,
        preServiceDescription: pacientTest.preServiceDescription,
        photoExtension: 'png',
      });

      expect(pacientUpdated).toMatchObject(pacientTest);
      expect(mockRepository.update).toBeCalledTimes(1);
    });
    it('Should be return Not founded error', async () => {
      const pacientTest = TestUtil.giveMeValidPacient();
      mockRepository.findOne
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(pacientTest);

      expect(
        service.update('uuidv4-test', {
          name: pacientTest.name,
          age: pacientTest.age,
          cityBorn: pacientTest.cityBorn,
          sex: pacientTest.sex,
          preServiceDescription: pacientTest.preServiceDescription,
          photoExtension: 'png',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
    it('Should be return Bad Request error', async () => {
      const pacientTest = TestUtil.giveMeValidPacient();
      mockRepository.findOne
        .mockReturnValueOnce(pacientTest)
        .mockReturnValueOnce({ ...pacientTest, id: 'uuid-v5' });

      expect(
        service.update('uuidv4-test', {
          name: pacientTest.name,
          age: pacientTest.age,
          cityBorn: pacientTest.cityBorn,
          sex: pacientTest.sex,
          preServiceDescription: pacientTest.preServiceDescription,
          photoExtension: 'png',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
  });
});
