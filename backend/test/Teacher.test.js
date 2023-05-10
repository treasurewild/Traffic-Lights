import Lesson from '../src/Models/Lesson.model.js'
import User from '../src/Models/User.model.js';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';
import { mockLessons } from "./mockLessons.js";
import { mockUsers } from './mockUsers.js';
import { it } from "mocha";

chai.use(chaiHttp);

describe('Testing Teacher Route requests', () => {

    const testServer = chai.request(server).keepOpen();
    //const mockUser = { _id: '64118f2d5fc0942d5e749885' };
    const falseUser = { _id: '54118f2d5fc0942d5e749883' }; // Does not exist

    describe('/GET all lessons', () => {

        beforeEach(async () => {
            //Clear database
            await Lesson.deleteMany()
                .catch(err => console.log(err));
            await User.deleteMany()
                .catch(err => console.log(err))

            console.log(`Database cleared`);

            //Insert data
            await User.insertMany(mockUsers)
                .catch(err => console.log(err))
            await Lesson.insertMany(mockLessons)
                .catch(err => console.log(err));

            console.log(`Database populated with test data`);
        });

        it('Should return 403 if accessToken is invalid', async () => {
            const res = await testServer
                .get(`/teacher/lessons`)
                .send({ headers: 'mockToken' });

            expect(res).to.have.status(403);
        });

        it('Should return all of the lessons for the test teacher as an array', async () => {

            const user = await testServer
                .post('/users/signin')
                .send({
                    email: 'test@test.com',
                    password: 'Test123'
                })

            const res = await testServer
                .get(`/teacher/lessons`)
                .set({ "x-access-token": user.body.accessToken });

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
        });

        it('Should return 204 status if no lessons by teacher', async () => {

            const user = await testServer
                .post('/users/signin')
                .send({
                    email: 'test1@test.com',
                    password: 'Test123'
                })

            const res = await testServer
                .get(`/teacher/lessons`)
                .set({ "x-access-token": user.body.accessToken });

            expect(res).to.have.status(204);
        });
    });

    describe('/POST lessons', () => {


        beforeEach(async () => {
            //Clear database
            await Lesson.deleteMany()
                .catch(err => console.log(err));
            await User.deleteMany()
                .catch(err => console.log(err))

            console.log(`Database cleared`);

            //Insert data
            await User.insertMany(mockUsers)
                .catch(err => console.log(err))
            await Lesson.insertMany(mockLessons)
                .catch(err => console.log(err));

            console.log(`Database populated with test data`);
        });

        it('Should return 200 status if successful', async () => {
            const testLesson = {
                shortId: '123456',
                learningObjective: 'test',
                classCode: 'test',
                level: 'test',
                subject: 'test',
                teacher: '5cc08495bf3fd62d03f2f4c1',
            };

            const user = await testServer
                .post('/users/signin')
                .send({
                    email: 'test@test.com',
                    password: 'Test123'
                });

            const res = await testServer
                .post(`/teacher/new-lesson`)
                .set({ "x-access-token": user.body.accessToken })
                .send(testLesson);

            expect(res).to.have.status(200);
            expect(res.body.lesson).to.be.an('object');
        });

        it('Should return 403 status if invalid token', async () => {
            const testLesson = {
                shortId: '123456',
                learningObjective: 'test',
                classCode: 'test',
                level: 'test',
                subject: 'test',
                teacher: '5cc08495bf3fd62d03f2f4c1',
            };

            const res = await testServer
                .post(`/teacher/new-lesson`)
                .set({ "x-access-token": 'mockToken' })
                .send(testLesson);

            expect(res).to.have.status(401);
        });

        it('Should return 400 status if not successful', async () => {
            const testLesson = {
                shortId: '123456',
                learningObjective: 'test',
                classCode: 'test',
                level: 'test',
                subject: 'test',
                teacher: '5cc08495bf3fd62d03f2f4c1',
                _id: '123456789' // Invalid ID format
            };

            const user = await testServer
                .post('/users/signin')
                .send({
                    email: 'test@test.com',
                    password: 'Test123'
                });

            const res = await testServer
                .post(`/teacher/new-lesson`)
                .set({ "x-access-token": user.body.accessToken })
                .send(testLesson);

            expect(res).to.have.status(400);
        });

    });

    describe('/DELETE lesson', () => {

        beforeEach(async () => {
            //Clear database
            await Lesson.deleteMany()
                .catch(err => console.log(err));
            await User.deleteMany()
                .catch(err => console.log(err))

            console.log(`Database cleared`);

            //Insert data
            await User.insertMany(mockUsers)
                .catch(err => console.log(err))
            await Lesson.insertMany(mockLessons)
                .catch(err => console.log(err));

            console.log(`Database populated with test data`);
        });

        it('Should return 200 status if delete successful', async () => {
            const testLesson = { _id: '44118f2d5fc0942d5e749885' };

            const user = await testServer
                .post('/users/signin')
                .send({
                    email: 'test@test.com',
                    password: 'Test123'
                });

            const res = await testServer
                .put(`/teacher/delete-lesson`)
                .set({ "x-access-token": user.body.accessToken })
                .send(testLesson._id)

            expect(res).to.have.status(200);
        });

        // How to deal with this?
        // it('Should return 400 status if not successful', async () => {
        //     const testLesson = { _id: '22118f2d5fc0942d5e74988' }; //Does not exist

        //     const user = await testServer
        //         .post('/users/signin')
        //         .send({
        //             email: 'test@test.com',
        //             password: 'Test123'
        //         });

        //     const res = await testServer
        //         .put(`/teacher/delete-lesson`)
        //         .set({ "x-access-token": user.body.accessToken })
        //         .send(testLesson._id)

        //     expect(res).to.have.status(400);
        // });

    });
});
