module.exports = function() {
    return {
        compare: function(actual, expected) {
            return {
                pass: actual === expected
            };
        }
    };
};
