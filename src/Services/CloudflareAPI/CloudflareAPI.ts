import {ApiResponse, ApisauceConfig, ApisauceInstance, create} from "apisauce";
import {IDNSRecord} from "./Interfaces/IDNSRecord";
import {IGenericArrayResponse} from "./Interfaces/IGenericResponses";

export class CloudflareAPI {

    private readonly apiSauce: ApisauceInstance;

    constructor(config: ApisauceConfig) {
        this.apiSauce = create(config)
    }

    public setAuthorization(Token: string): void {
        this.apiSauce.setHeader("Authorization", `Bearer ${Token}`);
    }

    public setAuthEmail(value: string): void {
        this.apiSauce.setHeader("X-Auth-Email", value);
    }

    public setAuthKey(value: string): void {
        this.apiSauce.setHeader("X-Auth-Key", value);
    }

    public async getDNSRecords(): Promise<Array<IDNSRecord>> {
        const response: ApiResponse<IGenericArrayResponse<IDNSRecord>> = await this.apiSauce.get(`/zones/${process.env.DOMAIN_ZONE_ID}/dns_records`);
        if ( response.data?.success ) {
            return response.data.result;
        }
        throw response.data?.errors.map(item => item.message);
    }

    public async patchDNSRecord(identifier: string, content: string): Promise<boolean> {
        const response: ApiResponse<IGenericArrayResponse<IDNSRecord>> = await this.apiSauce.patch(`/zones/${process.env.DOMAIN_ZONE_ID}/dns_records/${identifier}`, {
            content
        });
        if ( response.data?.success ) {
            return response.data.success;
        }
        throw response.data?.errors.map(item => item.message);
    }

    public async createDNSRecord(type: string, name: string, content: string, ttl: number, proxied: boolean): Promise<boolean> {
        const response: ApiResponse<IGenericArrayResponse<IDNSRecord>> = await this.apiSauce.post(`/zones/${process.env.DOMAIN_ZONE_ID}/dns_records/`, {
            type,
            name,
            content,
            ttl,
            proxied
        });
        if ( response.data?.success ) {
            return response.data.success;
        }
        throw response.data?.errors.map(item => item.message);
    }




}