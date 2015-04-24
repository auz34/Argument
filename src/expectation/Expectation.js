var coreMatchers = {
    toBe: require('matchers/toBe')
};

function Expectation(options) {
    this.actual = options.actual;

}

Expectation.prototype.print = function(value) {
    // TODO add a few nice prints for object etc.
    return '' + value;
};

Expectation.prototype.buildFailureMessage = function() {
    var args = Array.prototype.slice.call(arguments, 0),
        matcherName = args[0],
        isNot = args[1],
        actual = args[2],
        expected = args.slice(3),
        englishyPredicate = matcherName.replace(/[A-Z]/g, function(s) { return ' ' + s.toLowerCase(); });

    var message = 'Expected ' +
        Expectation.prototype.print(actual) +
        (isNot ? ' not ' : ' ') +
        englishyPredicate;

    if (expected.length > 0) {
        for (var i = 0; i < expected.length; i++) {
            if (i > 0) {
                message += ',';
            }
            message += ' ' + Expectation.prototype.print(expected[i]);
        }
    }

    return message + '.';
};

Expectation.prototype.wrapCompare = function(name, matcherFactory) {
    var args = Array.prototype.slice.call(arguments, 0),
        expected = args.slice(0),
        message = '';

    args.unshift(this.actual);

    var matcher = matcherFactory(),
        matcherCompare = matcher.compare;

    function defaultNegativeCompare() {
        var result = matcher.compare.apply(null, args);
        result.pass = !result.pass;
        return result;
    }

    if (this.isNot) {
        matcherCompare = matcher.negativeCompare || defaultNegativeCompare;
    }

    var result = matcherCompare.apply(null, args);

    if (!result.pass) {
        if (!result.message) {
            args.unshift(this.isNot);
            args.unshift(name);
            message = this.util.buildFailureMessage.apply(null, args);
        } else {
            if (Object.prototype.toString.apply(result.message) === '[object Function]') {
                message = result.message();
            } else {
                message = result.message;
            }
        }
    }

    if (expected.length == 1) {
        expected = expected[0];
    }

    this.addExpectationResult(name, result);
};

Expectation.prototype.addExpectationResult = function(name, result) {

};

