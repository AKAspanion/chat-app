"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const router_1 = __importDefault(require("./src/router"));
const socket_1 = __importDefault(require("./src/socket"));
const port = 8021;
const app = express_1.default();
const httpServer = http_1.default.createServer(app);
app.use(cors_1.default);
app.use(router_1.default);
httpServer.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
const io = new socket_io_1.Server(httpServer);
socket_1.default(io);
