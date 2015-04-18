'use strict';

(function() {
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Create a safe reference to the Argument function for use below.
    var ArgumentClass = function(arg, caller) {
        this.arg = arg;
        this.caller = caller;
    };

    ArgumentClass.prototype.resolveName = function() {
        return '';
    };

    var argument = function(arg) {
        return new ArgumentClass(arg, argument.caller);
    };

    // Export the Argument function for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `Argument` as a global function.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = argument;
    } else {
        root.argument = argument;
    }

    // Current version.
    argument.VERSION = '0.0.1';
}.call());
