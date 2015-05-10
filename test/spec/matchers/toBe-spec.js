var unit = require('../../../src/expectation/matchers/toBe'),
    toBe = unit().compare;

describe('toBe', function() {
    it('should return pass when actual strictly equal to expected', function() {
        var result = toBe('a', 'a');
        expect(result.pass).toBe(true);
    });

    it('should return pass when actual strictly equal to expected', function() {
        var result = toBe('1', 1);
        expect(result.pass).toBe(false);
    });
});
