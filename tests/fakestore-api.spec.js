import { test, expect } from '@playwright/test';

const endpoint = 'https://dummy.restapiexample.com/api/v1/employees';

const responseSchema = {
  type: 'object',
  required: ['status'],
  properties: {
    status: { type: 'string' },
    data: { type: 'array' },
    message: { type: 'string' },
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
          if (propertySchema.type === 'array' && !Array.isArray(value)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  return false;
}

test.describe('Dummy REST API employees endpoint', () => {
  test('should GET employees and validate status field', async ({ request }) => {
    const response = await request.get(endpoint);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('status');

    const isValidSchema = validateJsonSchema(body, responseSchema);
    expect(isValidSchema).toBe(true);

    console.log(`Product title: ${body.title ?? 'N/A'}`);
    console.log(`Product price: ${body.price ?? 'N/A'}`);
  });
});
