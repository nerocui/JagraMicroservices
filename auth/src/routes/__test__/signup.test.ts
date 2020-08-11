import request from 'supertest';
import { app } from '../../app';
import jwt from 'jsonwebtoken';

it('returns a 201 on successful singup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            firstName: 'test',
            lastName: 'test'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'tesdsadsadsom',
            password: 'password',
            firstName: 'test',
            lastName: 'test'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'tesds@adsad.som',
            password: '1',
            firstName: 'test',
            lastName: 'test'
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            firstName: 'test',
            lastName: 'test'
        })
        .expect(400);

    return request(app)
        .post('/api/users/signup')
        .send({
            password: 'password',
            firstName: 'test',
            lastName: 'test'
        })
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            firstName: 'test',
            lastName: 'test'
        })
        .expect(201);

    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
        password: 'password',
        firstName: 'test',
        lastName: 'test'
        })
        .expect(400);
});

it('gets a valid jwt after a successful signup', async () => {
    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            firstName: 'test',
            lastName: 'test'
        })
        .expect(201);
    expect(res.body.token).toBeDefined();
    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET!);
    expect(decoded).toBeDefined();
});