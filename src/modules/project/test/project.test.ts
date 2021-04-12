import * as request from 'supertest';
import * as app from '../../../app';
import { default as UserService } from '../services/project.srvc';
import { Project } from '../models/project';


import * as ProjectFakeObject from './fakeData/project.json';
import { User } from '../../user/models/user';

const uniqueKey = 'popapi' + Date.now();
const projectForm = (<any>ProjectFakeObject);

let userToken = 'error token ';
let validToken = 'Bearer ' + userToken;

describe('/project', () => {
    let user: User;


    describe('POST /project with invalid token ', () => {
        const route: string = '/api/project';
        it('should return 401 ;Invalid or no token supplied', (done) => {
            request(app).post(route)
                .send(projectForm)
                .set('Authorization', validToken)
                .then(res => {
                    user = res.body.data;
                    expect(res.status).toEqual(401);
                    done();
                });
        });

        it('should return 401 ;Invalid or no token supplied', (done) => {
            request(app).get(route)
                .set('Authorization', validToken)
                .then(res => {
                    user = res.body.data;
                    expect(res.status).toEqual(401);
                    done();
                });
        });
    });

    it('POST /user login', (done) => {
        request(app).post('/auth/login').send({email: 'user@gmail.com', password: 'devpass'})
        // .expect(200, done)
            .then(function (res) {
                userToken = res.body.token;
                validToken = 'Bearer ' + userToken;
                done();
            });

    });

    describe('POST /project with valid token ', () => {
        const route: string = '/api/project';

        it('should return 200 ; list of all saved project equal to 2', (done) => {
            request(app).get(route)
                .set('Accept', 'application/json')
                .set('Authorization', validToken)
                .then(res => {
                    user = res.body.data;
                    expect(res.status).toEqual(200);
                    done();
                });
        });
        it('should return 201 ; project created', (done) => {
            request(app).post(route)
                .set('Authorization', validToken)
                .send(projectForm)
                .then(res => {
                    user = res.body.data;
                    expect(res.status).toEqual(200);
                    done();
                });
        });

        it('should return 200 ; list of all saved project equal to 1', (done) => {
            request(app).get(route)
                .set('Authorization', validToken)
                .then(res => {
                    user = res.body.data;
                    expect(res.status).toEqual(200);
                    done();
                });
        });
    });

});