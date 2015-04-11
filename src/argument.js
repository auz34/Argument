'use strict';

(function() {
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Create a safe reference to the Argument function for use below.
    var Argument = function(arg) {
        if (!(this instanceof Argument)) {
            return new Argument(arg);
        }

        this.arg = arg;
    };

    // Export the Argument function for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `Argument` as a global function.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Argument;
    } else {
        root.Argument = Argument;
    }

    // Current version.
    Argument.VERSION = '0.0.1';
}.call());
