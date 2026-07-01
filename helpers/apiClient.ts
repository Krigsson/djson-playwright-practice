import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
    constructor(private request: APIRequestContext) {}

    async get(endpoint: string): Promise<APIResponse> {
        return await this.request.get(endpoint);
    }

    async post(endpoint: string, body: object): Promise<APIResponse> {
        return await this.request.post(endpoint, { data: body });
    }

    async delete(endpoint: string): Promise<APIResponse> {
        return await this.request.delete(endpoint);
    }

    async put(endpoint: string, body: object): Promise<APIResponse> {
        return await this.request.put(endpoint, { data: body });
    }
}