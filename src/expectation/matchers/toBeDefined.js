module.exports = function() {
    return {
        compare: function(actual) {
            return {
                pass: typeof actual !== 'undefined'
            };
        }
    };
};
