import { test, expect } from '@playwright/test';

const endpoint = 'https://fakestoreapi.com/products/1';

const productSchema = {
  type: 'object',
  required: ['id', 'title', 'price', 'category', 'description'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
    description: { type: 'string' },
  },
  additionalProperties: true,
};

function validateJsonSchema(data, schema) {
  if (schema.type === 'object') {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      return false;
    }
    if (schema.required) {
      for (const key of schema.required) {
        if (!(key in data)) {
          return false;
        }
      }
    }
    if (schema.properties) {
      for (const [key, propertySchema] of Object.entries(schema.properties)) {
        if (key in data) {
          const value = data[key];
          if (propertySchema.type === 'number' && typeof value !== 'number') {
            return false;
          }
          if (propertySchema.type === 'string' && typeof value !== 'string') {
            return false;
          }
          // Add additional primitive checks as needed.
        }
      }
    }
    return true;
  }
  return false;
}

test.describe('FakeStore API product endpoint', () => {
  test('should GET product 1 and validate required fields', async ({ request }) => {
    const response = await request.get(endpoint);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('price');
    expect(body).toHaveProperty('category');
    expect(body).toHaveProperty('description');

    const isValidSchema = validateJsonSchema(body, productSchema);
    expect(isValidSchema).toBe(true);

    console.log(`Product title: ${body.title}`);
    console.log(`Product price: ${body.price}`);
  });
});
