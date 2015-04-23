'use strict';
var args = require('../../src/argument');

describe('basics', function() {
    it('should provide global args function', function() {
        expect(typeof args).toEqual('function');
    });

    it('should provide "expect" function', function() {
        expect(typeof args.expect).toEqual('function');
    });

    it('should call callback if any error happens inside validation', function(done) {
        var callback = function() {
          done();
        };
        (function someFunc(a) {
            args(someFunc, function() {
                throw new Error('Intentional error');
            }, callback)
        })();
    });
});