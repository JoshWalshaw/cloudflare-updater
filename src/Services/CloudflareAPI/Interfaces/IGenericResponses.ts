import {IError} from "./IError";


// TODO: find out what messages contains

export interface IGenericArrayResponse<T> {
    result: Array<T>
    success: boolean
    errors: Array<IError>
    messages: Array<any>
}

export interface IGenericObjectResponse<T> {
    result: Array<T>
    success: boolean
    errors: Array<IError>
    messages: Array<any>
}