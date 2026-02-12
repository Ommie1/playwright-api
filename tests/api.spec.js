const { test, expect } = require('@playwright/test');
const { validLogin, invalidLogin, generateAgencyData } = require('../utils/testData');

// Base URL of API
const BASE_URL = 'https://automation-backend-ec08fe65847a.herokuapp.com/api/v1';

test.describe('API Tests', () => {

  // Case 1: Login with invalid credentials
  test('Case 1: Login with invalid credentials', async ({ request }) => {
    // Send POST request to login endpoint with wrong password
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: invalidLogin
    });

    // Expecting server response status
    expect(response.status()).toBe(500);
    const body = await response.json();

    // Validate error message
    expect(body).toEqual({ message: "Invalid credentials" });
  });

  // Case 2: Create resource without authentication
  test('Case 2: Create without authentication', async ({ request }) => {
    // Generate random agency data using helper
    const userData = generateAgencyData();
    // Use Faker to generate realistic random data
    const response = await request.post(`${BASE_URL}/agencies/add`, {
      data: userData
    });

    // Expecting API to reject unauthorized request
    expect(response.status()).toBe(500);
    const body = await response.json();

    // Validate error message
    expect(body).toEqual({ message: "Please authenticate" });
  });

  // Case 3: Login with correct credentials, create a resource, then fetch by ID
  test('Case 3: Login, create with token, get by ID', async ({ request }) => {

    let token;      // Store token for authentication
    let createdId;  // Store ID of created agency

    // Step 1: Login with valid credentials
    const loginResponse = await request.post(`${BASE_URL}/auth/login`, {
      data: validLogin
    });

    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    token = loginBody.tokens.access.token; // save token for subsequent requests

    // Generate agency data
    const userData = generateAgencyData();

    const createResponse = await request.post(`${BASE_URL}/agencies/add`, {
      data: userData,
      headers: { Authorization: `Bearer ${token}` } // include auth token
    });
    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    createdId = createBody.agency.id; // store created agency ID

    // Step 3: Fetch the agency by ID to validate creation
    const getResponse = await request.get(`${BASE_URL}/agencies/${createdId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();

    // Step 4: Validate structure of response (best practice)
    expect(getBody.response).toBeTruthy();

    // Step 5: Validate that all fields match the created data
    expect(getBody.response.name).toBe(userData.name);
    expect(getBody.response.address).toBe(userData.address);
    expect(getBody.response.phone).toBe(userData.phone);
    expect(getBody.response.email).toBe(userData.email);
  });
});
