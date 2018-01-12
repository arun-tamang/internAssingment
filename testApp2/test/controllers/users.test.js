import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';
import bookshelf from '../../src/db';

/**
 * Tests for '/api/users'
 */

let validNewUser = {
  firstName: 'Jimmy',
  lastName: 'Doe',
  email: 'jimmy@jimmy.com',
  password: 'jimmyPassword'
};

let tokens = {};

describe('Users Controller Test', () => {
  before(done => {
    bookshelf.knex.raw('TRUNCATE TABLE users, user_todo CASCADE').then(() => {
      bookshelf.knex
        .raw('TRUNCATE TABLE user_todo, tags_user_todo CASCADE')
        .then(() => done());
    });
  });

  it('should return list of users', done => {
    request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('should not create a new user if last name is not provided', done => {
    let user = {
      firstName: 'Jane Doe'
    };

    request(app)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        let { code, message, details } = res.body.error;

        expect(res.statusCode).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expect(details[0]).to.have.property('param', 'lastName');

        done();
      });
  });

  it('should not create a new user if email is not provided', done => {
    let user = {
      firstName: 'Jimmy',
      lastName: 'Doe',
      password: 'jopjpioji'
    };

    request(app)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        let { code, message, details } = res.body.error;

        expect(res.statusCode).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expect(details[0]).to.have.property('param', 'email');

        done();
      });
  });

  it('should create a new user with valid data', done => {
    let user = validNewUser;
    request(app)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        let { data } = res.body;
        validNewUser.id = data.id;

        expect(res.statusCode).to.be.equal(201);
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data).to.have.property('firstName');
        expect(data).to.have.property('lastName');
        expect(data).to.have.property('createdAt');
        expect(data).to.have.property('updatedAt');
        expect(data.email).to.be.equal(user.email);

        done();
      });
  });

  // it('should not give tokens for login with wrong password', done => {
  //   let { email } = validNewUser;
  //   let password = 'dummy password';
  //   request(app)
  //     .post('/api/admin/login')
  //     .send({ email, password })
  //     .end((err, res) => {
  //       console.log(res);

  //       done();
  //     });
  // });

  it('should return tokens on successful login', done => {
    let { email, password } = validNewUser;

    request(app)
      .post('/api/admin/login')
      .send({ email, password })
      .end((err, res) => {
        let body = res.body;

        expect(res.statusCode).to.be.equal(200);
        expect(body).to.be.an('object');
        expect(body).to.have.property('userInfo');
        expect(body).to.have.property('tokens');
        expect(body.tokens).to.have.property('refreshToken');
        expect(body.tokens).to.have.property('accessToken');
        tokens = body.tokens;

        done();
      });
  });

  it('should post new todo', done => {
    let header = { Authorization: tokens.accessToken };
    let newTodo = { name: 'some task to do', tagIds: [3, 5] };
    request(app)
      .put('/api/users/' + validNewUser.id + '/todo')
      .set(header)
      .send(newTodo)
      .end((err, res) => {
        let { body } = res;
        expect(res.statusCode).to.be.equal(200);
        expect(body).to.be.an('object');
        expect(body).to.have.property('name');
        expect(body).to.have.property('user_id');

        done();
      });
  });

  it('should return list of user\'s todos', done => {
    let header = { Authorization: tokens.accessToken };
    request(app)
      .get('/api/users/' + validNewUser.id + '/todo/1')
      .set(header)
      .end((err, res) => {
        let { body } = res;

        expect(res.statusCode).to.be.equal(200);
        expect(body.data).to.be.an('array');
        expect(body.data[0]).to.have.property('id');
        expect(body.data[0]).to.have.property('name');
        expect(body.data[0]).to.have.property('completed');

        done();
      });
  });

  it('should successfully logout', done => {
    let header = { Authorization: tokens.refreshToken };
    request(app)
      .delete('/api/admin/logout')
      .set(header)
      .end((err, res) => {
        let { body } = res;

        expect(res.statusCode).to.be.equal(200);
        expect(body).to.be.an('object');
        expect(body.message).to.be.a('string');
        expect(body.message).to.be.equal('successfully logged out');

        done();
      });
  });
});

// describe('Users Controller Test', () => {
//   before(done => {
//     bookshelf
//       .knex('users')
//       .truncate()
//       .then(() => done());
//   });

//   it('should return list of users', done => {
//     request(app)
//       .get('/api/users')
//       .end((err, res) => {
//         expect(res.statusCode).to.be.equal(200);
//         expect(res.body.data).to.be.an('array');
//         expect(res.body.data).to.have.lengthOf(0);

//         done();
//       });
//   });

//   it('should get information of user', done => {
//     request(app)
//       .get('/api/users/1')
//       .end((err, res) => {
//         let { data } = res.body;

//         expect(res.statusCode).to.be.equal(200);
//         expect(data).to.be.an('object');
//         expect(data).to.have.property('id');
//         expect(data).to.have.property('name');
//         expect(data).to.have.property('createdAt');
//         expect(data).to.have.property('updatedAt');

//         done();
//       });
//   });

//   it('should respond with not found error if random user id is provided', done => {
//     request(app)
//       .get('/api/users/1991')
//       .end((err, res) => {
//         let { code, message } = res.body.error;

//         expect(res.statusCode).to.be.equal(404);
//         expect(code).to.be.equal(404);
//         expect(message).to.be.equal('User not found');

//         done();
//       });
//   });

//   it('should update a user if name is provided', done => {
//     let user = {
//       name: 'John Doe'
//     };

//     request(app)
//       .put('/api/users/1')
//       .send(user)
//       .end((err, res) => {
//         let { data } = res.body;

//         expect(res.statusCode).to.be.equal(200);
//         expect(data).to.be.an('object');
//         expect(data).to.have.property('id');
//         expect(data).to.have.property('name');
//         expect(data).to.have.property('createdAt');
//         expect(data).to.have.property('updatedAt');
//         expect(data.name).to.be.equal(user.name);

//         done();
//       });
//   });

//   it('should not update a user if name is not provided', done => {
//     let user = {
//       noname: 'John Doe'
//     };

//     request(app)
//       .put('/api/users/1')
//       .send(user)
//       .end((err, res) => {
//         let { code, message, details } = res.body.error;

//         expect(res.statusCode).to.be.equal(400);
//         expect(code).to.be.equal(400);
//         expect(message).to.be.equal('Bad Request');
//         expect(details).to.be.an('array');
//         expect(details[0]).to.have.property('message');
//         expect(details[0]).to.have.property('param', 'name');

//         done();
//       });
//   });

//   it('should delete a user if valid id is provided', done => {
//     request(app)
//       .delete('/api/users/1')
//       .end((err, res) => {
//         expect(res.statusCode).to.be.equal(204);

//         done();
//       });
//   });

//   it('should respond with not found error if random user id is provided for deletion', done => {
//     request(app)
//       .delete('/api/users/1991')
//       .end((err, res) => {
//         let { code, message } = res.body.error;

//         expect(res.statusCode).to.be.equal(404);
//         expect(code).to.be.equal(404);
//         expect(message).to.be.equal('User not found');

//         done();
//       });
//   });

//   it('should respond with bad request for empty JSON in request body', done => {
//     let user = {};

//     request(app)
//       .post('/api/users')
//       .send(user)
//       .end((err, res) => {
//         let { code, message } = res.body.error;

//         expect(res.statusCode).to.be.equal(400);
//         expect(code).to.be.equal(400);
//         expect(message).to.be.equal('Empty JSON');

//         done();
//       });
//   });
// });
