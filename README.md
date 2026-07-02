# DummyJSON API Tests

Automated API test suite for [DummyJSON](https://dummyjson.com/) built with Playwright and TypeScript.

![Playwright Tests](https://github.com/Krigsson/djson-playwright-practice/actions/workflows/playwright.yml/badge.svg)

## Stack
- Playwright
- TypeScript
- GitHub Actions (CI)

## Project Structure
```
├── tests/
│   ├── auth.spec.ts        # Authentication tests
│   └── products.spec.ts    # Products CRUD tests
├── helpers/
│   ├── apiClient.ts        # HTTP client wrapper
│   ├── endpoints.ts        # API endpoints
│   └── types.ts            # TypeScript interfaces
├── test-data/
│   ├── products.json       # Test data for products
│   └── users/
│       ├── correct-users.json
│       └── invalid-users.json
```

## What is tested

**Authentication (`auth.spec.ts`)**
- Login with valid credentials;
- Login with invalid credentials;
- Access protected endpoint with valid Bearer token;
- Access protected endpoint without token;
- Access protected endpoint with invalid/expired token.

**Products (`products.spec.ts`)**
- GET all products;
- GET single product by ID;
- GET non-existent product (404);
- POST new product;
- PUT update existing product;
- DELETE product.

## How to Run

Install dependencies:
npm install

Run all tests:
npx playwright test

View HTML report:
npx playwright show report

## CI
Tests run automatically on every push to `master` via GitHub Actions.