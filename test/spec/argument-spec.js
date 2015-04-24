'use strict';
var argslib = require('../../src/argument'),
    args = argslib.args,
    ArgumentError = argslib.ArgumentError;

describe('basics', function() {
    beforeEach(function() {
        this.addMatchers({
            toBeInstanceOf: function(expectedInstance) {
                var actual = this.actual;
                var notText = this.isNot ? ' not' : '';
                this.message = function() {
                    return 'Expected ' + actual.constructor.name + notText + ' is instance of ' + expectedInstance.name;
                };
                return actual instanceof expectedInstance;
            }
        });
    });

    it('should provide global args function', function() {
        expect(typeof args).toEqual('function');
    });

    it('should provide "expect" function', function() {
        expect(typeof args.expect).toEqual('function');
    });

    it('should call callback if any error happens inside validation', function(done) {
        var callback = function(error) {
            expect(error).toBeInstanceOf(ArgumentError);
            done();
        };
        (function someFunc(a) {
            args(someFunc, function() {
                throw new Error('Intentional error');
            }, callback);
        })();
    });

    it('should throw error if any error happens inside validation and there is no callback', function(done) {
        try{
            (function someFunc(a) {
                args(someFunc, function() {
                    throw new Error('Intentional error');
                });
            })();
        } catch(error){
            expect(error).toBeInstanceOf(ArgumentError);
            done();
        }
    });

    it('should provide name of the subject function if applicable', function(done) {
        try{
            (function someFunc(a) {
                args(someFunc, function() {
                    throw new Error('Intentional error');
                });
            })();
        } catch(error){
            expect(error.caller).toBeTruthy();
            expect(error.caller.name).toBe('someFunc');
            done();
        }
    });


});