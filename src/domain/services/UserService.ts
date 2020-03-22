import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { IUserService } from '../interfaces/services/IUserService';
import { IUserRepository } from '../interfaces/repositories/IUserRepository';
import { IUser } from '../interfaces/entities/IUser';
import { UserRole } from '../interfaces/entities/enums/UserRole';
import { DatabaseError } from '../../errors/DatabaseError';
import { AppError } from '../../errors/AppError';

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async updateUser(userId: string, updateData: Partial<Pick<IUser, 'email' | 'role' | 'lastAction'>>): Promise<IUser> {
    try {
      const updatedUser = await this.userRepository.updateUser(userId, updateData);
      return updatedUser;
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw new AppError('DATABASE_ERROR', error.message);
      }
      throw error;
    }
  }

  async createUser(email: string): Promise<IUser> {
    const user: IUser = {
      id: uuidv4(),
      email,
      role: UserRole.USER
    };

    try {
      const createdUser = await this.userRepository.createUser(user);
      return createdUser;
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw new AppError('DATABASE_ERROR', error.message);
      }
      throw error;
    }
  }

  async getUser(userId: string): Promise<IUser> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new AppError('USER_NOT_FOUND', `User with id ${userId} doesn't exists`);
    }

    return user;
  }

  getAllUsers(): Promise<IUser[]> {
    return this.userRepository.getAll();
  }
}
