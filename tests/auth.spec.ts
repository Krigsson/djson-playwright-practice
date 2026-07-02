import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/apiClient';
import { ENDPOINTS } from '../helpers/endpoints';
import { User } from '../helpers/types';
import correctLoginData from '../test-data/users/correct-users.json';
import invalidLoginData from '../test-data/users/invalid-users.json';

for (const { username, password } of correctLoginData) {
    test(`Test login for valid {${username}} : {${password}} set`, async ({ request }) => {
        const client = new ApiClient(request);
        const response = await client.post(ENDPOINTS.auth.login, { body: { 'username': username, 'password': password } });

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
        const response = await client.post(ENDPOINTS.auth.login, { body: { 'username': username, 'password': password } });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.message).toBeDefined();
        expect(body.message).toContain(errorMessage);
    });
}

for (const { username, password } of correctLoginData) {
    test(`Login with bearerToken for ${username}`, async ({ request }) => {
        const client = new ApiClient(request);
        
        const loginResponse = await client.post(ENDPOINTS.auth.login, 
            {body: { 'username': username, 'password': password}}
        );
        
        const { accessToken } = await loginResponse.json();
        
        const response = await client.get(ENDPOINTS.auth.me, 
            { headers: { 'Authorization': `Bearer ${ accessToken }` }
        });

        expect(response.status()).toBe(200);
        const body = await response.json() as User;
        expect(body.username).toContain(username);
    });
}

test('Login without Bearer token', async ({ request }) => {
    const client = new ApiClient(request);
    const response = await client.get(ENDPOINTS.auth.me,
        {
            headers: { 'Authorization': '' }
        });

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.message).toContain('Access Token is required');
});

for (const { bearerToken } of invalidLoginData) {
    test(`Login with invalid bearerToken: {${bearerToken}}`, async ({ request }) => {
        const client = new ApiClient(request);
        const response = await client.get(ENDPOINTS.auth.me,
            {
                headers: { 'Authorization': `Bearer ${bearerToken}` }
            });

        expect(response.status()).toBe(401);
        const body = await response.json();
        expect(body.message).toContain('Invalid/Expired Token!');
    });
}



