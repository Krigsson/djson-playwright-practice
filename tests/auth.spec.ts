import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/apiClient';
import { ENDPOINTS } from '../helpers/endpoints';
import { User } from '../helpers/types';
import loginData from '../test-data/users.json'

for (const { username, password } of loginData) {
    test(`Test login for {${username}} : {${password}} set`, async ({ request }) => {
        const client = new ApiClient(request);
        const response = await client.post(ENDPOINTS.auth.login, { 'username': username, 'password': password });

        expect(response.status()).toBe(200);
        const body = await response.json() as User;
        expect(body.username).toContain(username);
        expect(body.id).toBeDefined();
        expect(body.email).toContain('dummyjson');
    });
}
