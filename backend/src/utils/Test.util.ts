import { randomUUID } from 'crypto';
import { PACIENT_SEX } from '../enums/pacient-sex.enum';
import { PacientEntity } from '../pacient/pacient.entity';

export class TestUtil {
  static giveMeValidPacient() {
    const pacient: PacientEntity = {
      id: randomUUID(),
      age: 12,
      cityBorn: 'Gavião Peixoto',
      name: 'Ruan Victor dos Santos Rateira',
      photoProfile: `${this.name.replaceAll(' ', '-')}.png`,
      preServiceDescription: 'Dores fortes na barriga',
      sex: PACIENT_SEX.MASC,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return pacient;
  }

  static giveMeValidPacients(quantity: number) {
    const pacient: PacientEntity = this.giveMeValidPacient();
    const pacients: PacientEntity[] = [];

    for (let i = 0; i < quantity; i++) {
      pacients.push(pacient);
    }

    return pacients;
  }
}
