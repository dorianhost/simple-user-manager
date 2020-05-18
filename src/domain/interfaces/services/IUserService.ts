import { IUser } from '../entities/IUser';

export interface IUserService {
  createUser(email: string): Promise<IUser>;
  updateUser(
    userId: string,
    updateData: Partial<Pick<IUser, 'email' | 'role' | 'lastAction'>>,
  ): Promise<IUser>;
  getUser(userId: string): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
}
