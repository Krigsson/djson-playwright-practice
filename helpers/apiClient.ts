import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
    constructor(private request: APIRequestContext) {}

    async get(endpoint: string): Promise<APIResponse> {
        const response = await this.request.get(endpoint);
        return await this.request.get(endpoint);
    }

    async post(endpoint: string, body: object): Promise<APIResponse> {
        const response = await this.request.post(endpoint, { data: body });
        return await this.request.post(endpoint, {data: body});
    }
}