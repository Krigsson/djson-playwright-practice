import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/apiClient';
import { ENDPOINTS } from '../helpers/endpoints';
import { Product, ProductsResponse } from '../helpers/types';


test('Length of all products is greater than 0', async({ request }) => {
    const client = new ApiClient(request);
    const response = await client.get(ENDPOINTS.products.all);

    expect(response.ok()).toBeTruthy();
    const body = await response.json() as ProductsResponse;
    expect(body.products.length).toBeGreaterThan(0);
});

test('Get specific product', async({ request }) => { 
    const client = new ApiClient(request);
    const response = await client.get(ENDPOINTS.products.single(14));

    expect(response.ok()).toBeTruthy();
    const body = await response.json() as Product;
    expect(body.id).toBe(14);
    expect(body.title).toContain("Chair");
});

test('Non-existant product', async({ request }) => {
    const client = new ApiClient(request);
    const response = await client.get(ENDPOINTS.products.single(-1));

    expect(response.status()).toBe(404);
});