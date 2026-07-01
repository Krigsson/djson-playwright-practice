import { test, expect } from '@playwright/test';
import { ApiClient } from '../helpers/apiClient';
import { ENDPOINTS } from '../helpers/endpoints';
import { Product, ProductsResponse } from '../helpers/types';
import productData from '../test-data/products.json'

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

for (const {title, category, tags} of productData) {
    test(`Adding new product ${title}`, async({ request }) => {
        const client = new ApiClient(request);
        const response = await client.post(ENDPOINTS.products.add, {'title': title, 'category': category, 'tags': tags});

        expect(response.status()).toBe(201);
        const body = await response.json() as Product;    
        expect(body.id).toBeDefined();
        expect(typeof body.id).toBe('number');
        expect(body.title).toContain(title);
    });
}
