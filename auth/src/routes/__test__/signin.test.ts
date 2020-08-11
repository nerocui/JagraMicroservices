import request from 'supertest';
import { app } from '../../app';
import jwt from 'jsonwebtoken';

it('signs the user in with valid email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            firstName: 'test',
            lastName: 'test'
        })
        .expect(201);
    const res = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password',
        })
        .expect(200);
    
    expect(res.body.token).toBeDefined();
    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET!);
    expect(decoded).toBeDefined();
});

it('fails when invalid credential is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'nero@email.com',
            password: 'password'
        })
        .expect(400);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            firstName: 'test',
            lastName: 'test'
        })
        .expect(201);
    return await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'dsasdsa'
        })
        .expect(400);
})
