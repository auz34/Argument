var argument = require('../../src/argument');

describe('internals', function() {
    it ('should have access to caller function in non strict mode', function() {
        var arg = null;
        (function someFunc(a) {
            arg = argument(a);
        })();

        expect(arg.caller).toBeTruthy();
    });

    it ('should not define caller in strict mode', function() {
        'use strict';
        var arg = null;
        (function someFunc(a) {
            arg = argument(a);
        })();

        expect(arg.caller).toBeNull();
    });

    it ('should be able to extract list of arguments of the function', function() {
        var arg = null;
        (function someFunc(first, second, a, b) {
            arg = argument(a);
        })();
        var funcInfo = arg.getCallerInfo();

        expect(funcInfo.namedParameters).toBe(['first', 'second', 'a', 'b']);
    });
});

describe('basics', function() {
    'use strict';
    it('should provide global Argument function', function() {
        expect(typeof argument).toEqual('function');
    });

    it('should create instance of argument', function() {
        var arg = null;
        (function someFunc(a) {
            arg = argument(a);
        })();

        expect(arg).not.toBe(null);
    });

    /*it('should be able to extract metadata information about argument', function() {
        var arg = null;
        var someFunc = function(a) {
            arg = argument(a);
        };

        someFunc(5);
        expect(arg.resolveName()).toEqual('a');
    });*/
});