import { IUser } from '../entities/IUser';

export interface IUserService {
  createUser(email: string): Promise<IUser>;
  makeUserAsAdmin(userId: string): Promise<IUser>;
  getUser(userId: string): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
}
