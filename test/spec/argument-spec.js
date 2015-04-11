'use strict';

/* jshint ignore:start */
var Argument = require('../../src/argument');
/* jshint ignore:end */

describe('basics', function() {
    it('should provide global Argument function', function() {
        expect(typeof Argument).toEqual('function');
    });
});