import { UserModel } from '../models/User';
import { User } from '../../domain/interfaces/entities/User';
import { IUserRepository } from '../../domain/interfaces/repositories/UserRepository';
import { BaseRepository } from './base';
import { DatabaseError } from '../../errors/DatabaseError';

class UserRepository extends BaseRepository<UserModel> implements IUserRepository {
  async getUserById(userId: string): Promise<User | undefined> {
    const repository = await this.getRepository();
    const userModel = await repository.findOne(userId);

    return userModel?.toUser();
  }

  async createUser(user: User): Promise<User> {
    const repository = await this.getRepository();

    const userCountWithSameEmail = await repository.count({
      email: user.email
    });
    if (userCountWithSameEmail > 0) {
      throw new DatabaseError(`User with email ${user.email} already exists`);
    }

    await repository.insert(user);
    return user;
  }

  async getAll(): Promise<User[]> {
    const repository = await this.getRepository();

    const userModels = await repository.find();
    return userModels.map(userModel => userModel.toUser());
  }
}

export const userRepository = new UserRepository(UserModel.name);
