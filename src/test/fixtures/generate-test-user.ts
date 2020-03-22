import faker from 'faker';
import { IUser } from '../../domain/interfaces/entities/IUser';
import { UserRole } from '../../domain/interfaces/entities/enums/UserRole';

export function generateTestUser(): IUser {
  return {
    id: faker.random.uuid(),
    email: faker.internet.email(),
    role: UserRole.USER,
    lastAction: faker.date.recent()
  };
}
