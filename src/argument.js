(function() {
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Export the argument function for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `argument` as a global function.
    var _isNode = (typeof module !== 'undefined' && module.exports);
    var _isBrowser = !_isNode;

    var isStrict = function(fn) {
        if (_isBrowser) {
            return (function() { return !this; })();
        }

        try {
            var caller = fn.caller;
            return false;
        } catch(e) {
            return true;
        }
    };

    // Create a safe reference to the Argument function for use below.
    var ArgumentClass = function(arg, caller, errorObject) {
        this.arg = arg;
        this.caller = caller;
        this.errorObject = errorObject;
    };

    ArgumentClass.prototype.resolveName = function() {
        return '';
    };

    // Thanks Angular team for regex'es and end ready example how to do it
    // https://github.com/angular/angular.js/blob/master/src/auto/injector.js#L65-80
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    ArgumentClass.prototype.getCallerInfo = function() {
        var result = {
            namedParameters: []
        };

        if (!this.caller) {
            return {};
        }

        var fnText = this.caller.toString().replace(STRIP_COMMENTS, ''),
            argDecl = fnText.match(FN_ARGS),
            args = argDecl[1].split(FN_ARG_SPLIT);

        for (var i=0; i<args.length; i++) {
            result.namedParameters.push(args[i].trim());
        }

        return result;
    };


    var argument = function(arg) {
        var caller  = isStrict(argument) ? null : argument.caller;
        var errorObject = new Error('Instrumentation error');
        return new ArgumentClass(arg, caller, errorObject);
    };

    if (_isNode) {
        module.exports = argument;
    } else {
        root.argument = argument;
    }

    // Current version.
    argument.VERSION = '0.0.1';

}.call());
