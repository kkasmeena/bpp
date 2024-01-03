const express = require("express");
const bodyParser = require('body-parser');
const request = require("supertest");
const { expect } = require("@jest/globals");

const router = require('./lists');

const app = new express();
app.use('/', [
    bodyParser.json({ strict: true }),
    router
]);

describe('POST list routes', () => {
    
    // This test is expecting a 201, however a 200 is received.
    // The code needs to be fixed to return a 201 for creating data
    test('201 returned when creating a new list', async () => {
        const post_response = await request(app).post('/').send({ data: { title: 'test' }});
        expect(post_response.status).toBe(201);
    });

    // This test is expecting a 400, however a 500 is received
    // The code needs to be fixed to return a 400 for creating a list with empty data (required field)
    test('400 returned when creating new list with empty data', async () => {
        const post_response = await request(app).post('/').send({ data: {} });
        expect(post_response.status).toBe(400);
    });
});

describe('GET list routes', () => {
     test('200 returned when retrieving list', async () => {
        const get_response = await request(app).get('/');
        expect(get_response.status).toBe(200);

        const { data } = get_response.body;
        expect(Array.isArray(data)).toBeTruthy();
     });

    test('404 returned when retrieving non existent list id', async () => {
        const get_response = await request(app).get('/123');
        expect(get_response.status).toBe(404);
    });
});

describe('PATCH list routes', () => {
    test('404 returned when updating list with non existent list id', async () => {
        const patch_response = await request(app).patch('/123');
        expect(patch_response.status).toBe(404);
    });
    
    test('404 returned when updating a list with missing id', async () => {
        const patch_response = await request(app).patch('/');
        expect(patch_response.status).toBe(404);
    });
    
    test('200 returned when updating a list with existing id', async () => {
        const post_response = await request(app).post('/').send({ data: { title: 'test' }});
        expect(post_response.status).toBe(200);
        const { id } = post_response.body.data;

        const patch_response = await request(app).patch(`/${id}`).send({ data: { title: "Update" }});
        expect(patch_response.status).toBe(200);
    });

    // This test is expecting a 400, but receiving a 500 error
    // The code needs to be fixed to return a 400 for bad request as data is a required field
    test('400 returned when updating a list with empty data', async () => {
        const post_response = await request(app).post('/').send({ data: { title: 'test' }});
        expect(post_response.status).toBe(200);
        const { id } = post_response.body.data;

        const patch_response = await request(app).patch(`/${id}`).send({ data: {} });
        expect(patch_response.status).toBe(400);
    });
});

describe('DELETE list routes', () => {
    test('200 returned when deleting a list with existing id', async () => {
        const post_response = await request(app).post('/').send({ data: { title: 'test' }});
        expect(post_response.status).toBe(200);
        const { id } = post_response.body.data;

        const delete_response = await request(app).delete(`/${id}`);
        expect(delete_response.status).toBe(200);
    });
    
    test('404 returned when deleting a list with missing id', async () => {
        const delete_response = await request(app).delete('/');
        expect(delete_response.status).toBe(404);
    });

    test('404 returned when deleting a list with non existent id', async () => {
        const delete_response = await request(app).delete('/123');
        expect(delete_response.status).toBe(404);
    });
});