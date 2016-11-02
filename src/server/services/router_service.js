import path from 'path';
import { Router } from 'express';
import setRoutes from '../utils/router_util';

const router = new Router();
const globDir = path.join(__dirname, '../routes/**/*.js');

export default setRoutes(globDir, router);
