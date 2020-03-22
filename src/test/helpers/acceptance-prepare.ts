import supertest from 'supertest';
import './database-prepare';
import { app } from '../../api/app';

const server = app.listen();

afterAll(() => server.close());

export const request = supertest(server);
