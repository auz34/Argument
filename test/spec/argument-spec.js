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

    it('should call callback if any error happens inside validation', function() {
        var callback = function(error) {
            expect(error).toBeInstanceOf(ArgumentError);
        };
        (function someFunc(a) {
            args(someFunc, function() {
                throw new Error('Intentional error');
            }, callback);
        })();
    });

    it('should throw error if any error happens inside validation and there is no callback', function() {
        try{
            (function someFunc(a) {
                args(someFunc, function() {
                    throw new Error('Intentional error');
                });
            })();
        } catch(error){
            expect(error).toBeInstanceOf(ArgumentError);
        }
    });

    it('should provide name of the subject function if applicable and validation fails', function() {
        try{
            (function someFunc(a) {
                args(someFunc, function() {
                    throw new Error('Intentional error');
                });
            })();
        } catch(error){
            expect(error.caller).toBeTruthy();
            expect(error.caller.name).toBe('someFunc');
        }
    });

    it('should provide list of named parameters of named function', function() {
        try{
            (function someFunc(first, second, anotherParam) {
                args(someFunc, function() {
                    throw new Error('Intentional error');
                });
            })();
        } catch(error){
            expect(error.caller.parameters).toEqual(['first', 'second', 'anotherParam']);
        }
    });

    it('should provide list of named parameters of unnamed function', function() {
        try {
            var obj = {
                someFunc: function(first, second, anotherParam) {
                    args(obj.someFunc, function() {
                        throw new Error('Intentional error');
                    });
                }
            };

            obj.someFunc();
        } catch(error){
            expect(error.caller.parameters).toEqual(['first', 'second', 'anotherParam']);
        }
    });
});

describe('main use cases', function(){
    it('should go forward if all parameters are ok', function(){
        var a;
        (function someFunc(first, second, anotherParam) {
            args(someFunc, function() {
                args.expect(first).toBe(5);
                args.expect(second).toBe('a');
                args.expect(anotherParam).toBeDefined();
            });

            a=7;
        })(5,'a',{});

        expect(a).toBe(7);
    });

    it('should throw exception if argument is wrong', function(){
        function someFunc(param) {
            args(someFunc, function() {
                args.expect(param).toBe(5);
            });
        }

        expect(function() {someFunc(1);}).toThrow();
    });
});