import { IUserService } from '../domain/interfaces/services/IUserService';
import { container } from './container';

class ServicesStorage {
  constructor(public userService: IUserService) {}
}

const servicesStorage = container.build(ServicesStorage);

export { servicesStorage };
