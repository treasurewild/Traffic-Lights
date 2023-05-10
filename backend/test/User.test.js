import Lesson from '../src/Models/Lesson.model.js'
import User from '../src/Models/User.model.js';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import { mockUsers } from "./mockUsers.js";
import { it } from "mocha";

chai.use(chaiHttp);

describe('User Authentications Requests Tests', () => {

    beforeEach(async () => {
        //Clear database
        await User.deleteMany()
            .catch(err => console.log(err));

        console.log(`Database cleared`);

        //Insert data
        await User.insertMany(mockUsers)
            .catch(err => console.log(err));

        console.log(`Database populated with user data`);
    });

    const testServer = chai.request(server).keepOpen();

    it('Registers User successfully', async () => {
        const res = await testServer
            .post(`/users/register`)
            .send({
                name: 'Test2',
                email: 'test2@test.com',
                password: 'Test2'
            })

        expect(res).to.have.status(200);

    });

    it('Sign in for user with correct password returns 200 and accessToken', async () => {
        // Uses the mock User inserted in BeforeEach
        const res = await testServer
            .post('/users/signin')
            .send({
                email: 'test@test.com',
                password: 'Test123'
            })

        expect(res).to.have.status(200);
        expect(res.body.accessToken).to.be.a('string');
    })

    it('Sign in for user with incorrect password returns 401', async () => {
        // Uses the user registered in the last test
        const res = await testServer
            .post('/users/signin')
            .send({
                email: 'test@test.com',
                password: 'Wrong Password'
            })

        expect(res).to.have.status(401);
        expect(res.body.message).to.be.eql("Invalid username/password combination");
    })

    it('Sign in for user with incorrect password returns 404', async () => {
        // Uses the user registered in the last test
        const res = await testServer
            .post('/users/signin')
            .send({
                email: 'wrong@test.com',
                password: 'Test'
            })

        expect(res).to.have.status(404);
        expect(res.body.message).to.be.eql("User not found");
    })
})