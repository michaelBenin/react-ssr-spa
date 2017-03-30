import supertest from 'supertest';
import { app } from '../../../src/server/services/express_service';

export default supertest.agent(app);
