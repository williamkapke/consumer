
var Consumer = require('../consumer');
var should = require('should');


describe("Consumer", function () {
	var consumer = new Consumer("1234567890");

	function checkit(m, position){
		should.exist(m);
		m.should.be.an.instanceOf(Array);
		consumer.position.should.equal(position);
	}

	it("current should get the current character", function () {
		var x = consumer.current;
		x.should.equal("1");
	});

	it("should consume the RegExp match", function () {
		var m = consumer.consume(/\d/g);
		checkit(m, 1);
	});

	it("should continue from the `lastIndex`", function () {
		var m = consumer.consume(/\d/g);
		checkit(m, 2);

		m = consumer.consume(/\d/g);
		checkit(m, 3);

		var regex = /\d/g;
		m = consumer.consume(regex);
		checkit(m, 4);

		m = consumer.consume(regex);
		checkit(m, 5);
	});

	it("should convert non-global RegExps to global ones", function () {
		var re = /\d/;
		consumer.consume(re);
		re.global.should.be.true;
	});


	it("should not consume if the match fails", function () {
		var position = consumer.position;
		var m = consumer.consume(/x/);
		consumer.position.should.equal(position);
	});

	it("`peek` should not consume", function () {
		var position = consumer.position;
		var m = consumer.peek(3);
		m.should.equal("789");
		consumer.position.should.equal(position);
	});

});
