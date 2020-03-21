import { User } from '../entities/User';

export interface IUserRepository {
  createUser: (user: User) => Promise<User>;
  getUserById: (userId: string) => Promise<User | undefined>;
  getAll: () => Promise<User[]>;
}
