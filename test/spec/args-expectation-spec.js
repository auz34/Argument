var expectationFactory = require('../../src/expectation/Expectation');

describe('expectation', function() {
    var result = [],
        reporter = function(res) {
            result.push(res);
        };

    beforeEach(function() {
        result = [];
    });

    it('should return one result per one expect evaluation', function() {
        var expectObj = expectationFactory({
            actual: 5,
            reporters: [reporter]
        });

        expectObj.toBe(6);
        expect(result.length).toBe(1);
        expectObj.toBe(5);
        expect(result.length).toBe(2);
    });

    it('should be able to see positive result', function() {
        var expectObj = expectationFactory({
            actual: 5,
            reporters: [reporter]
        });

        expectObj.toBe(5);
        expect(result[0].pass).toBe(true);
    });

    it('should be able to see negative result', function() {
        var expectObj = expectationFactory({
            actual: '5',
            reporters: [reporter]
        });

        expectObj.toBe(5);
        expect(result[0].pass).toBe(false);
    });

    it('should negate result if "isNot" option is included', function() {
        var expectObj = expectationFactory({
            actual: 't',
            reporters: [reporter],
            isNot: true
        });

        expectObj.toBe('a');
        expect(result[0].pass).toBe(true);
    });

    it('should support fluent property for negation', function() {
        var expectObj = expectationFactory({
            actual: 'd',
            reporters: [reporter]
        });

        expectObj.not.toBe('a');
        expect(result[0].pass).toBe(true);
    });


});