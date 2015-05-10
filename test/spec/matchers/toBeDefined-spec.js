var unit = require('../../../src/expectation/matchers/toBeDefined'),
    toBeDefined = unit().compare;

describe('toBeDefined', function() {
    it('should pass when actual isn\'t equal undefined', function() {
        var result = toBeDefined('value');
        expect(result.pass).toBe(true);
    });

    it('should return pass when actual strictly equal to expected', function() {
        var result = toBeDefined(void 0);
        expect(result.pass).toBe(false);
    });
});
