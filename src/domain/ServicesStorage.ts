import { IUserService } from './interfaces/services/IUserService';
import { container } from '../dependency-injection/container';
import { IAppLogger } from './interfaces/services/IAppLogger';

class ServicesStorage {
  constructor(public userService: IUserService, public appLogger: IAppLogger) {}
}

const servicesStorage = container.build(ServicesStorage);

export { servicesStorage };
