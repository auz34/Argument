(function() {
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Export the argument function for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `argument` as a global function.
    var _isNode = (typeof module !== 'undefined' && module.exports);
    var _isBrowser = !_isNode;

    function ArgumentError() {
    }

    ArgumentError.prototype = Object.create(Error.prototype);
    ArgumentError.prototype.constructor = ArgumentError;

    // Thanks Angular team for regex'es and ready example how to do it
    // https://github.com/angular/angular.js/blob/master/src/auto/injector.js#L65-80
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    var args = function(func, validator, callback) {
        try{
            validator();
        } catch (err) {
            if (callback) {
                callback(err);
            }
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
