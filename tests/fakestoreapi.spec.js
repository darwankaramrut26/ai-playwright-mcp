import { test, expect } from '@playwright/test';

const endpoint = 'https://fakestoreapi.com/products/1';
const expectedKeys = ['id', 'title', 'price', 'category', 'description'];
const schema = {
  id: 'number',
  title: 'string',
  price: 'number',
  category: 'string',
  description: 'string',
};

test.describe('FakeStore API', () => {
  test('should return product details for /products/1', async ({ request }) => {
    const response = await request.get(endpoint);

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Verify required keys are present
    for (const key of expectedKeys) {
      expect(body).toHaveProperty(key);
    }

    // Optional schema validation by checking expected types
    for (const [key, type] of Object.entries(schema)) {
      expect(typeof body[key]).toBe(type);
    }

    console.log(`Product title: ${body.title}`);
    console.log(`Product price: ${body.price}`);
  });
});
