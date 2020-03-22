import { UserRole } from './enums/UserRole';

export interface IUser {
  id: string;
  email: string;
  role: UserRole;
  lastAction?: Date;
}
