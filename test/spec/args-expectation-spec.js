var expectationFactory = require('../../src/expectation/Expectation');

describe('expectation', function() {
    var result = [],
        reporter = function(res) {
            result.push(res);
        };

    beforeEach(function() {
        result = [];
    });

    it('should be able to see positive result', function() {
        var expectObj = expectationFactory({
            actual: 5,
            reporters: [reporter]
        });

        expectObj.toBe(5);

        expect(result.length).toBe(1);
        expect(result[0].pass).toBe(true);
    });

    it('should be able to see negative result', function() {
        var expectObj = expectationFactory({
            actual: '5',
            reporters: [reporter]
        });

        expectObj.toBe(5);
        expect(result.length).toBe(1);
        expect(result[0].pass).toBe(false);
    });
});