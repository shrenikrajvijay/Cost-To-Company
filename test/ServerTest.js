
process.env.NODE_ENV = 'test';
var server = require('../server.js');

// Test cases for the All the Service End points.
const chai = require('chai');
var chaiHttp = require('chai-http');

// Include the Assertion library
var should = chai.should();
chai.use(chaiHttp);

var person = null;
describe('saving data to db', function() {
  var person = {"FirstName":'abc',
                "LastName":'cde',
                "Address":'asdf',
                "Salary":'1234',
                "Company":'company'
  };
  this.timeout(0);
  it('data should pass for valid data', (done) => {
    chai.request(server).
            post('/storeData').
	    send(person).
            end((err, res) => {
              res.should.have.status(200);
              done();
            });
  });
});
describe('get data from db', function() {
  this.timeout(0);
  it('data should pass for valid data', (done) => {
    chai.request(server).
            get('/a').
            end((err, res) => {
	      res.should.have.status(200);
              done();
            });
  });
});
/*
describe('saving data to db test no firstname', function() {
  var person1 = {"FirstName":'',
                "LastName":'cde',
                "Address":'asdf',
                "Salary":'1234',
                "Company":'company'
  };
  this.timeout(0);
  it('data should pass for valid data', (done) => {
    chai.request(server).
            post('/storeData').
	    send(person1).
            end((err, res) => {
	      console.log('The error is', err);
	      console.log(res);
              //err.should.have.message('First name cannot be null');
              //res.should.have.status(200);
              done();
            });
  });
});
*/
