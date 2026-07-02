import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/apiClient';
import { ENDPOINTS } from '../helpers/endpoints';
import { User } from '../helpers/types';
import correctLoginData from '../test-data/users/correct-users.json';
import invalidLoginData from '../test-data/users/invalid-users.json';

for (const { username, password } of correctLoginData) {
    test(`Test login for valid {${username}} : {${password}} set`, async ({ request }) => {
        const client = new ApiClient(request);
        const response = await client.post(ENDPOINTS.auth.login, { 'username': username, 'password': password });

        expect(response.status()).toBe(200);
        const body = await response.json() as User;
        expect(body.username).toContain(username);
        expect(body.id).toBeDefined();
        expect(body.email).toContain('dummyjson');
    });
}

for (const { username, password, errorMessage } of invalidLoginData) {
    test(`Test login for invalid {${username}} : {${password}} set`, async ({ request }) => {
        const client = new ApiClient(request);
        const response = await client.post(ENDPOINTS.auth.login, { 'username': username, 'password': password});

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body["message"]).toBeDefined();
        expect(body["message"]).toContain(errorMessage);
    });
}
