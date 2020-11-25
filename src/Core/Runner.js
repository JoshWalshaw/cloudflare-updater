"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
const CloudflareAPI_1 = require("../Services/CloudflareAPI/CloudflareAPI");
class Runner {
    constructor() {
        this.CloudflareAPI = new CloudflareAPI_1.CloudflareAPI({
            baseURL: process.env.API_BASE_URL,
        });
    }
    async startRunner() {
        await this.CloudflareAPI.getDNSRecords();
    }
}
exports.Runner = Runner;
