"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (_, res) => {
    res.status(200).send('Server is up and running');
});
exports.default = router;
