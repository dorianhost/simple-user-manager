import { IUser } from '../entities/IUser';

export interface IUserRepository {
  createUser: (user: IUser) => Promise<IUser>;
  getUserById: (userId: string) => Promise<IUser | undefined>;
  getAll: () => Promise<IUser[]>;
  updateUser(userId: string, updateData: Omit<Partial<IUser>, 'id'>): Promise<IUser>;
}
