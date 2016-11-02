import supertestPromised from 'supertest-as-promised';
import { app } from '../../../src/server/services/server_service';

export default supertestPromised.agent(app);
