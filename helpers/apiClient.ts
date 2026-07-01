import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {
    constructor(private request: APIRequestContext) {}

    async get<T>(endpoint: string): Promise<T> {
        const response = await this.request.get(endpoint);
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }

    async post<T>(endpoint: string, body: object): Promise<T> {
        const response = await this.request.post(endpoint, { data: body });
        return await response.json();
    }
}