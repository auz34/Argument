(function() {
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;
    var expectation = require('./expectation/Expectation');

    // Export the argument function for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `argument` as a global function.
    var _isNode = (typeof module !== 'undefined' && module.exports);
    var _isBrowser = !_isNode;

    var stackParser = null;
    if (_isNode) {
        stackParser = require('../node_modules/error-stack-parser/error-stack-parser');
    } else {
        stackParser = ErrorStackParser;
    }

    // Thanks Angular team for regex'es and ready example how to do it
    // https://github.com/angular/angular.js/blob/master/src/auto/injector.js#L65-80
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    function ArgumentError(originalError, validatedFunction, validationErrors) {
        // collect information about function arguments of which are being validated
        this.caller = {
            name: validatedFunction.name,
            parameters: []
        };

        this.validationErrors = validationErrors;

        var fnText = validatedFunction.toString().replace(STRIP_COMMENTS, ''),
            argDecl = fnText.match(FN_ARGS),
            args = argDecl[1].split(FN_ARG_SPLIT);

        for (var i=0; i<args.length; i++) {
            this.caller.parameters.push(args[i].trim());
        }
    }

    ArgumentError.prototype = Object.create(Error.prototype);
    ArgumentError.prototype.constructor = ArgumentError;

    var results;
    var args = function(func, validator, callback) {
        var error;
        try {
            results = [];
            validator();
            if (results.length > 0){
                var s = JSON.stringify(results[0]);
                console.log(s);
                error = new ArgumentError(null, func, null);
            }
        } catch (err) {
            error = new ArgumentError(err, func, null);
        }

        if (error) {
            if (callback) {
                callback(error);
                return;
            }

            throw error;
        }
    };

    var reporter = function(expectResult) {
        if (expectResult.pass) {
            return;
        }

        results.push({
            expectResult: expectResult,
            stack: stackParser.parse(new Error('instrumental error'))
        });
    };

    args.expect = function(value) {
        return expectation({
            actual: value,
            customMatchers: args.CustomMatchers,
            reporters: [reporter]
        });
    };

    if (_isNode) {
        module.exports.args = args;
        module.exports.ArgumentError = ArgumentError;
    } else {
        root.args = args;
        root.ArgumentError = ArgumentError;
    }

    // Current version.
    args.VERSION = '0.0.1';

}.call());
