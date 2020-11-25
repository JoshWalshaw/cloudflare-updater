"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudflareAPI = void 0;
const apisauce_1 = require("apisauce");
class CloudflareAPI {
    constructor(config) {
        this.apiSauce = apisauce_1.create(config);
    }
    async getDNSRecords() {
        const response = this.apiSauce.get(`/zones/${process.env.DOMAIN_ZONE_ID}/dns_records`);
        console.log(response);
    }
    setAuthorization(Token) {
        this.apiSauce.setHeader("Authorization", `Bearer ${Token}`);
    }
    removeAuthorization() {
        this.apiSauce.deleteHeader("Authorization");
    }
}
exports.CloudflareAPI = CloudflareAPI;
