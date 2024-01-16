import dotenv from 'dotenv';
import {
  buildFastify,
  start
} from './services/server/application.service';


dotenv.config({ path: '../.env.test'});

const server = buildFastify();
start(server);
