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
