const { test, expect } = require('@playwright/test');
const { requestBody, headers, baseURL } = require('../../../models/API/contact');
import { name } from 'faker';
const Ajv = require('ajv');
import { schemaValidation } from '../../../models/API/schemas';

test.describe('Contact API Tests', () => {

    test('Create a new contact', async () => {
        const firstName = name.firstName();
        const lastName = name.lastName();
        console.log(baseURL)
        const response = await fetch(`${baseURL}${'/contacts'}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody(firstName, lastName)),
        });
        expect(response.status).toBe(201);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('firstName', firstName);
        expect(responseBody).toHaveProperty('lastName', lastName);
    });

    test('Get contact list', async () => {
        const response = await fetch(`${baseURL}${'/contacts'}`, {
            method: 'GET',
            headers,
        });
        const responseBody = await response.json();

        expect(response.status).toBe(200);
        const ajv = new Ajv();
        const validate = ajv.compile(schemaValidation);
        const isValid = validate(responseBody);
        if (!isValid) {
            const errors = validate.errors;
            console.log(errors);
        }
    });

    test('Get contact by ID', async () => {
        // XXX before create a new contact 
        const firstName = name.firstName();
        const lastName = name.lastName();
        const createContactResponse = await fetch(`${baseURL}${'/contacts'}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody(firstName, lastName)),
        });
        expect(createContactResponse.status).toBe(201);
        const responseBody = await createContactResponse.json();
        let contactId = responseBody._id;
        //   XXX get contact by id
        console.log(contactId)
        const response = await fetch(`${baseURL}/contacts/${contactId}`, {
            method: 'GET',
            headers,
        });
        const responseData = await response.json();
        expect(response.ok).toBe(true);
        expect(responseData).toHaveProperty('firstName', firstName);
        expect(responseData).toHaveProperty('lastName', lastName);
    });


    test('Delete contact', async () => {
        // XXX before create a new contact 
        const firstName = name.firstName();
        const lastName = name.lastName();
        const createContactResponse = await fetch(`${baseURL}${'/contacts'}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody(firstName, lastName)),
        });
        expect(createContactResponse.status).toBe(201);
        const responseBody = await createContactResponse.json();
        let contactId = responseBody._id;
        //XXX delete contact by id
        const response = await fetch(`${baseURL}/contacts/${contactId}`, {
            method: 'DELETE',
            headers
        });
        expect(response.status).toBe(200);
    });

    test('Delete all created contact', async () => {
        const response = await fetch(`${baseURL}/contacts`, {
            method: 'GET',
            headers,
        });
        const responseBody = await response.json();

        if (responseBody && Array.isArray(responseBody)) {
            await Promise.all(responseBody.map(async (contact) => {
                if (contact._id) {
                    const deleteResponse = await fetch(`${baseURL}/contacts/${contact._id}`, {
                        method: 'DELETE',
                        headers,
                    });
                }
            }));
        }
    });

});