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
	      //should.exist(res);
	      //res.body.should.have.status(200);
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

describe('Post_Task', function() {
	it('Post_Task', function(done) {
	  chai.request('http://localhost:5000')
	    .post('../take_task')
	    .send({'poster_name' : 'tester', 'description' : 'this is for test', 
	    	'price' : '100', 'start_date' : '', 'end_date' : ''})
	    .end(function(err, res){
	      //should.exist(res);
	      //res.body.should.have.status(200);
	      //res.should.be.json;
	      //res.body.should.be.a('object');
	      //res.body.should.have.property('SUCCESS');
	      //res.body.SUCCESS.should.be.a('object');
	      //res.body.SUCCESS.should.have.property('poster_name');
	      //res.body.SUCCESS.should.have.property('description');
	      //res.body.SUCCESS.should.have.property('_id');
	      //res.body.SUCCESS.poster_name.should.equal('tester');
	      //res.body.SUCCESS.destription.should.equal('this is for test');
	      done();
	    });
	});
});

describe('Take_Task', function() {
	it('Take_Task', function(done) {
	  chai.request('http://localhost:5000')
	    .post('../take_task')
	    .send({'task_id': '1001'})
	    .end(function(err, res){
	      //should.exist(res);
	      //res.body.should.have.status(200);
	      //res.should.be.json;
	      //res.body.should.be.a('object');
	      //res.body.should.have.property('SUCCESS');
	      //res.body.SUCCESS.should.be.a('object');
	      //res.body.SUCCESS.should.have.property('task_id');
	      //res.body.SUCCESS.task_id.should.equal('1001');
	      done();
	    });
	});
});


describe('Add_Friend', function() {
	it('Add_Friend', function(done) {
	  chai.request('http://localhost:5000')
	    .post('../add_friend')
	    .send({'user_name' : 'tester', 'friend_name': 'Jianan'})
	    .end(function(err, res){
	      //should.exist(res);
	      //res.body.should.have.status(200);
	      //res.should.be.json;
	      //res.body.should.be.a('object');
	      //res.body.should.have.property('SUCCESS');
	      //res.body.SUCCESS.should.be.a('object');
	      //res.body.SUCCESS.should.have.property('user_name');
	      //res.body.SUCCESS.should.have.property('friend_name');
	      //res.body.SUCCESS.should.have.property('_id');
	      //res.body.SUCCESS.user_name.should.equal('test');
	      //res.body.SUCCESS.friend_name.should.equal('Jianan');
	      done();
	    });
	});
});

describe('Get_Friends', function() {
	it('Get_Friend', function(done) {
	  chai.request('http://localhost:5000')
	    .post('../get_friends')
	    .send({'user_name': 'tester'})
	    .end(function(err, res){
	      //should.exist(res);
	      //res.body.should.have.status(200);
	      //res.should.be.json;
	      //res.body.should.be.a('object');
	      //res.body.should.have.property('SUCCESS');
	      //res.body.SUCCESS.should.be.a('object');
	      //res.body.SUCCESS.should.have.property('user_name');
	      //res.body.SUCCESS.should.have.property('_id');
	      //res.body.SUCCESS.user_name.should.equal('tester');
	      done();
	    });
	});
});

