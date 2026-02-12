const { test, expect } = require('@playwright/test');

// Base URL of API
const BASE_URL = 'https://automation-backend-ec08fe65847a.herokuapp.com/api/v1';

let token = "";
let createdId = "";

test.describe('API Tests', () => {

  // Case 1: Login with invalid credentials
  test('Case 1: Login with invalid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        email: "admin@gmail.com",
        password: "123456"
      }
    });

    expect(response.status()).toBe(500); // invalid credentials
    const body = await response.json();
    expect(body).toEqual({ message: "Invalid credentials" });
  });

  // Case 2: Create without authentication
  test('Case 2: Create without authentication', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/agencies/add`, {
      data: {
        name: "john",
        address: "seattle",
        phone: "1234567890",
        email: "john@abc.com"
      }
    });

    expect(response.status()).toBe(500); // unauthorized
    const body = await response.json();
    expect(body).toEqual({ message: "Please authenticate" });
  });

  // Case 3: Login, create with token, get by ID
  test('Case 3: Login, create with token, get by ID', async ({ request }) => {
    // Step 1: Login with valid credentials
    const loginResponse = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        email: "admin@gmail.com",
        password: "admin@123"
      }
    });
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    token = loginBody.token;

    // Step 2: Create resource with Bearer token
    const createResponse = await request.post(`${BASE_URL}/create`, {
      data: {
        name: YOUR_NAME,
        address: "some value",
        phone: "1234567890",
        email: YOUR_EMAIL
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    expect(createResponse.status()).toBe(201);
    const createBody = await createResponse.json();
    createdId = createBody.id;

    // Step 3: Get resource by ID
    const getResponse = await request.get(`${BASE_URL}/getById`, {
      params: { id: createdId },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    expect(getResponse.status()).toBe(200);
    const getBody = await getResponse.json();

    // Validate values
    expect(getBody.name).toBe(YOUR_NAME);
    expect(getBody.address).toBe("some value");
    expect(getBody.phone).toBe("1234567890");
    expect(getBody.email).toBe(YOUR_EMAIL);
  });

});