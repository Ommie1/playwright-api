const { faker } = require('@faker-js/faker');

module.exports = {
  // Correct login credentials
  validLogin: {
    email: 'admin@gmail.com',
    password: 'admin@123'
  },

  // Incorrect login credentials for negative tests
  invalidLogin: {
    email: 'admin@gmail.com',
    password: 'wrongPassword123'
  },

  // Function to generate unique agency data
  generateAgencyData: () => ({
    name: faker.person.fullName(),
    address: faker.location.city(),
    phone: faker.phone.number('##########'),
    email: `qa_${Date.now()}@test.com` // unique email
  })
};
