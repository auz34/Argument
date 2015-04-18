(function() {
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Create a safe reference to the Argument function for use below.
    var ArgumentClass = function(arg, fnObject) {
        this.arg = arg;
        this.fnObject = fnObject;
    };

    ArgumentClass.prototype.resolveName = function() {
        return '';
    };

    var argument = function(arg) {
        return new ArgumentClass(arg);
    };

    // Export the argument function for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `argument` as a global function.
    argument.isNode = (typeof module !== 'undefined' && module.exports);
    argument.isBrowser = !argument.isNode;
    if (argument.isNode) {
        module.exports = argument;

    } else {
        root.argument = argument;
    }

    // Current version.
    argument.VERSION = '0.0.1';

}.call());
