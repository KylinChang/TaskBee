var chai = require('chai');
var expect = chai.expect;
var app = require('app')
var CartSummary = require('./../../src/part1/cart-summary');

describe('test_on_encryption', function() {
  it('login() should return 0 if no items are passed in', function() {
    var cartSummary = new CartSummary([]);
    expect(cartSummary.getSubtotal()).to.equal(0);
  });
});
