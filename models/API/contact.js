export const requestBody = (fakeFirstName, fakeLastName) => {
    const value = {
        firstName: fakeFirstName, lastName: fakeLastName,
        birthdate: '1970-01-01',
        email: 'jdoe@fake.com',
        phone: '8005555555',
        street1: '1 Main St.',
        street2: 'Apartment A',
        city: 'Anytown',
        stateProvince: 'KS',
        postalCode: '12345',
        country: 'USA',
    }
    return value;
};
export const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkwNzBkZTcwYzc1YzAwMTNiOWJiMjQiLCJpYXQiOjE2ODczNDUzOTF9.S7r0-UmCUXJAxelblXC3DaavC_NSnGCw8bOqy6y1798`,
};

export const baseURL = 'https://thinking-tester-contact-list.herokuapp.com';