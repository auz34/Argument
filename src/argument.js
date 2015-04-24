(function() {
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Export the argument function for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `argument` as a global function.
    var _isNode = (typeof module !== 'undefined' && module.exports);
    var _isBrowser = !_isNode;

    // Thanks Angular team for regex'es and ready example how to do it
    // https://github.com/angular/angular.js/blob/master/src/auto/injector.js#L65-80
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    function ArgumentError(originalError, validatedFunction, validator) {
        // collect information about function arguments of which are being validated
        this.caller = {
            name: validatedFunction.name,
            parameters: []
        };

        var fnText = validatedFunction.toString().replace(STRIP_COMMENTS, ''),
            argDecl = fnText.match(FN_ARGS),
            args = argDecl[1].split(FN_ARG_SPLIT);

        for (var i=0; i<args.length; i++) {
            this.caller.parameters.push(args[i].trim());
        }
    }

    ArgumentError.prototype = Object.create(Error.prototype);
    ArgumentError.prototype.constructor = ArgumentError;

    var args = function(func, validator, callback) {
        try{
            validator();
        } catch (err) {
            var wrapperError = new ArgumentError(err, func, validator);
            if (callback) {
                callback(wrapperError);
                return;
            }

            throw wrapperError;
        }
    };

    args.expect = function(value) {
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
