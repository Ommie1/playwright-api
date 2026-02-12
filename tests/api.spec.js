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
        email: "john@example.com"
      }
    });

    expect(response.status()).toBe(500); // unauthorized
    const body = await response.json();
    expect(body).toEqual({ message: "Please authenticate" });
  });

  // Case 3: Login, create with token, get by ID
  test('Case 3: Login, create with token, get by ID', async ({ request }) => {
    // Step 1: Login
    const loginResponse = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        email: "admin@gmail.com",
        password: "admin@123"
      }
    });
    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    token = loginBody.tokens.access.token; // assign to outer variable
    console.log("Token:", token);

    // Step 2: Create resource
    const userData = {
      name: "Martin",
      address: "Seattle",
      phone: "1234567890",
      email: `martin${Date.now()}@example.com` // unique email
    };

    const createResponse = await request.post(`${BASE_URL}/agencies/add`, {
      data: userData,
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    createdId = createBody.agency.id; // <-- updated to match API response
    console.log("Created ID:", createdId);

    // Step 3: Get resource by ID
    const getResponse = await request.get(`${BASE_URL}/agencies/${createdId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();
    console.log(getBody)

    // Best practice: verify structure first
    expect(getBody.response).toBeTruthy();

    // Validate values
    expect(getBody.response.name).toBe(userData.name);
    expect(getBody.response.address).toBe(userData.address);
    expect(getBody.response.phone).toBe(userData.phone);
    expect(getBody.response.email).toBe(userData.email);
  });
});