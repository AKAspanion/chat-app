import cors from 'cors';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

import router from './src/router';
import socket from './src/socket';

const port = 8021;

const app = express();

const httpServer = http.createServer(app);

app.use(cors);

app.use(router);

httpServer.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = new Server(httpServer);

socket(io);
