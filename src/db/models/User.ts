import { Entity, PrimaryColumn, Column, CreateDateColumn, Unique } from 'typeorm';
import { UserRole } from '../../domain/interfaces/entities/enums/UserRole';
import { IUser } from '../../domain/interfaces/entities/IUser';

@Entity('user')
@Unique(['email'])
export class UserModel {
  @PrimaryColumn({
    type: 'uuid',
    name: 'id'
  })
  public id: string;

  @Column({
    type: 'text',
    name: 'email'
  })
  public email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  public role: UserRole;

  @Column({
    type: 'timestamptz',
    name: 'last_action',
    nullable: true
  })
  public lastAction?: Date | null;

  @CreateDateColumn({
    type: 'timestamptz',
    readonly: true,
    name: 'created_at'
  })
  public createdAt: Date;

  toUser(): IUser {
    const user: IUser = {
      id: this.id,
      email: this.email,
      role: this.role
    };

    if (this.lastAction) {
      user.lastAction = this.lastAction;
    }

    return user;
  }
}
