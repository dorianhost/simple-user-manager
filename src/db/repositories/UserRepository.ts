import { UserModel } from '../models/User';
import { IUser } from '../../domain/interfaces/entities/IUser';
import { IUserRepository } from '../../domain/interfaces/repositories/IUserRepository';
import { BaseRepository } from './base';
import { DatabaseError } from '../../errors/DatabaseError';

export class UserRepository extends BaseRepository<UserModel> implements IUserRepository {
  constructor() {
    super(UserModel.name);
  }

  async updateUser(userId: string, updateData: Omit<Partial<IUser>, 'id'>): Promise<IUser> {
    const repository = await this.getRepository();

    const usersCountWithId = await repository.count({ id: userId });
    if (!usersCountWithId) {
      throw new DatabaseError(`User ${userId} does not exists`);
    }

    if (updateData.email) {
      const userCountWithSameEmail = await repository.count({
        email: updateData.email
      });
      if (userCountWithSameEmail > 0) {
        throw new DatabaseError(`User with email ${updateData.email} already exists`);
      }
    }

    return repository.manager.transaction<IUser>(async transactionManager => {
      await transactionManager.update(this.entityName, userId, updateData);
      const result = await transactionManager.findOne<IUser>(this.entityName, userId);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return result!;
    });
  }

  async getUserById(userId: string): Promise<IUser | undefined> {
    const repository = await this.getRepository();
    const userModel = await repository.findOne(userId);

    return userModel?.toUser();
  }

  async createUser(user: IUser): Promise<IUser> {
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

  async getAll(): Promise<IUser[]> {
    const repository = await this.getRepository();

    const userModels = await repository.find();
    return userModels.map(userModel => userModel.toUser());
  }
}
