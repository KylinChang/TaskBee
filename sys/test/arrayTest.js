var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var assert = chai.assert;
var server = require('../model/db');
let should = chai.should();
let expect = chai.expect;


describe('Test', function() {
  it('Array should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});

describe('Register', function() {
	it('Register', function(done) {
	  chai.request('http://localhost:5000')
	    .post('../register')
	    .send({'name': 'Java', 'password': '12345678'})
	    .end(function(err, res){
	      //res.should.have.status(200);
	      //res.should.be.json;
	      //res.body.should.be.a('object');
	      //res.body.should.have.property('SUCCESS');
	      //res.body.SUCCESS.should.be.a('object');
	      //res.body.SUCCESS.should.have.property('name');
	      //res.body.SUCCESS.should.have.property('lastName');
	      //res.body.SUCCESS.should.have.property('_id');
	      //res.body.SUCCESS.name.should.equal('Java');
	      //res.body.SUCCESS.lastName.should.equal('Script');
	      done();
	    });
	});
});

