module.exports = function() {
    function toBeDefined() {
        return {
            compare: function(actual) {
                return {
                    pass: typeof actual !== 'undefined'
                };
            }
        };
    }

    return toBeDefined;
};
