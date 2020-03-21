import faker from 'faker';
import { User } from '../../domain/interfaces/entities/User';
import { UserRole } from '../../domain/interfaces/entities/enums/UserRole';

export function generateTestUser(): User {
  return {
    id: faker.random.uuid(),
    email: faker.internet.email(),
    role: UserRole.USER,
    lastAction: faker.date.recent()
  };
}
