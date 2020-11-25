import PublicIP from "public-ip"
import {CloudflareAPI} from "../Services/CloudflareAPI/CloudflareAPI";
import {IDNSRecord} from "../Services/CloudflareAPI/Interfaces/IDNSRecord";
import {Logger} from "../Utils/Logger";


export class Runner {

    public readonly CloudflareAPI: CloudflareAPI;

    constructor () {
        this.CloudflareAPI = new CloudflareAPI({
            baseURL: process.env.API_BASE_URL,
        });

        this.CloudflareAPI.setAuthorization(String(process.env.API_BEARER_TOKEN));
        this.CloudflareAPI.setAuthEmail(String(process.env.API_AUTH_EMAIL));
        this.CloudflareAPI.setAuthKey(String(process.env.API_AUTH_KEY));
    }

    private async updateRecords(): Promise<void> {

        Logger.getLogger().info("================");
        Logger.getLogger().info("Fetching DNS records from CloudFlare");
         const CurrentDNSRecords: Array<IDNSRecord> = await this.CloudflareAPI.getDNSRecords();
         const TargetRecord: IDNSRecord = CurrentDNSRecords.filter(item => item.name === "developer.joshwalshaw.com" && item.type === "A")[0];
        Logger.getLogger().info("Fetching our current IP address");
        const IPAddress = await PublicIP.v4();

        Logger.getLogger().info(`Our IP address is: ${IPAddress}`);

        if ( IPAddress ) {
             if ( TargetRecord ) {
                 Logger.getLogger().info("We already have a record in CloudFlare, updating that record with our IP");
                 const SuccessfulUpdate: boolean = await this.CloudflareAPI.patchDNSRecord(TargetRecord.id, IPAddress);
                 Logger.getLogger().info(`Successfully updated DNS: ${SuccessfulUpdate}`)
             }
             else {
                 Logger.getLogger().info("No record was found in CloudFlare, creating a new record for the future.");
                 const SuccessfulCreation: boolean = await this.CloudflareAPI.createDNSRecord("A", "developer", IPAddress, 120, true);
                 Logger.getLogger().info(`Successfully created DNS: ${SuccessfulCreation}`)
             }
         }
    }

    public async startRunner(): Promise<void> {
        await this.updateRecords();
        // Every 5 minutes
        setInterval(async () => {
            await this.updateRecords();
        }, (1000 * 60) * 5)
    }

}