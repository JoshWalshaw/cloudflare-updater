"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Runner_1 = require("./Core/Runner");
dotenv_1.default.config();
new Runner_1.Runner().startRunner().finally();
