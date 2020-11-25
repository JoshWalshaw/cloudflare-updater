export interface IDNSRecord {
    id: string
    zone_id: string
    zone_name: string
    name: string
    type: string
    content: string
    proxiable: boolean
    proxied: boolean
    ttl: number
    locked: boolean
    created_on: string
    modified_on: string
}