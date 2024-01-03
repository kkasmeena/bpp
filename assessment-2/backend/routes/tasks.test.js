const express = require("express");
const bodyParser = require('body-parser');
const request = require("supertest");
const { expect, describe } = require("@jest/globals");

const listrouter = require('./lists');
const taskrouter = require('./tasks');

const app = new express();
app.use('/lists', [
    bodyParser.json({ strict: true }),
    listrouter
]);

app.use('/tasks', [
    bodyParser.json({ strict: true }),
    taskrouter
]);

describe('GET tasks routes', () => {
    test('200 returned when retrieving tasks', async () => {
        const get_response = await request(app).get('/tasks');
        expect(get_response.status).toBe(200);
        
        const { data } = get_response.body;
        expect(Array.isArray(data)).toBeTruthy();
    });
    
    test('404 returned when querying for non existent task', async () => {
        const get_response = await request(app).get('/tasks/123');
        expect(get_response.status).toBe(404);
    });
});

describe('POST / PATCH / DELETE', () => {
    let list_id;

    beforeEach(async () => {
        const list_post_response = await request(app).post('/lists').send({ data: { title: 'test' }});
        expect(list_post_response.status).toBe(201);
        list_id = list_post_response.body.data.id;
    });

    describe('POST tasks routes', () => {
        // This test is expecting a 201, however a 200 is received
        // The code needs to be fixed to return a 201 for creating data
        test('201 returned when creating a task', async () => {
            const task_post_response = await request(app).post('/tasks').send({ data: { listId: `${list_id}`, title: "New Task" }});
            expect(task_post_response.status).toBe(201);
        });
    
        // This test is expecting a 400, however a 500 is received
        // The code needs to be fixed to return a 400 for bad request
        test('400 returned when creating a task with empty title', async () => {
            const task_post_response = await request(app).post('/tasks').send({ data: { listId: `${list_id}`, title: "" }});
            expect(task_post_response.status).toBe(400);
        });
    
        // This test is expecting a 400, however a 500 is received
        // The code needs to be fixed to return a 400 for bad request
        test('400 returned when creating a task with empty list id', async () => {
            const task_post_response = await request(app).post('/tasks').send({ data: { listId: "", title: "New Task" }});
            expect(task_post_response.status).toBe(400);
        });
    });
    
    describe("PATCH tasks routes", () => {
        test('404 returned when updating task with missing id', async () => {
            const task_patch_response = await request(app).patch('/tasks/');
            expect(task_patch_response.status).toBe(404);
        });
    
        test('404 returned when updating task with non existent task id', async () => {
            const task_patch_response = await request(app).patch('/tasks/123');
            expect(task_patch_response.status).toBe(404);
        });
    
        test('200 returned when updating task', async () => {
            const task_post_response = await request(app).post('/tasks').send({ data: { listId: `${list_id}`, title: "New Task" }});
            //response code here needs to be changed to 201 once bug is fixed
            expect(task_post_response.status).toBe(200);
            const { id } = task_post_response.body.data;

            const task_patch_response = await request(app).patch(`/tasks/${id}`).send({ data:{listId: `${list_id}`, title: "update" }});
            expect(task_patch_response.status).toBe(200);
        });
    });
    
    describe("DELETE tasks route", () => {
        test('404 returned when deleting task with missing id', async () => {
            const task_delete_response = await request(app).delete('/tasks/');
            expect(task_delete_response.status).toBe(404);
        });
        
        test('404 returned when deleting task with non existend id', async () => {
            const task_delete_response = await request(app).delete('/tasks/123');
            expect(task_delete_response.status).toBe(404);
        });
        
        test('404 returned when deleting task', async () => {
            const task_post_response = await request(app).post('/tasks').send({ data: { listId: `${list_id}`, title: "New Task" }});
                //response code here needs to be changed to 201 once bug is fixed
            expect(task_post_response.status).toBe(200);
            const { id } = task_delete_response.body.data;
    
            const task_delete_response = await request(app).delete(`/tasks/${id}`);
            expect(task_delete_response.status).toBe(200);
        });
    });
});

