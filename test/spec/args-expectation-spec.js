var expectationFactory = require('../../src/expectation/Expectation');

describe('expectation', function() {
   beforeEach(function() {

   });

    it('should add positive result', function() {
        var expectObj = expectationFactory({
            actual: '5'
        });

        expectObj.toBe(5);
    });
});