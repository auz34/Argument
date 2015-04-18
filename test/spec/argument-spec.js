'use strict';


var argument = require('../../src/argument');

describe('basics', function() {
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