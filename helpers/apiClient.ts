import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
    constructor(private request: APIRequestContext) {}

    async get(endpoint: string, options?: {body?: object, headers?: Record<string, string>}): Promise<APIResponse> {
        return await this.request.get(endpoint, { data: options?.body, headers: options?.headers});
    }

    async post(endpoint: string, options?: { body?: object, headers?: Record<string, string>}): Promise<APIResponse> {
        return await this.request.post(endpoint, { data: options?.body, headers: options?.headers });
    }

    async delete(endpoint: string): Promise<APIResponse> {
        return await this.request.delete(endpoint);
    }

    async put(endpoint: string, body: object): Promise<APIResponse> {
        return await this.request.put(endpoint, { data: body });
    }
}