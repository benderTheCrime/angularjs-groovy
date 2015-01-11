(function() {
    'use strict';

    var cli = require('../components/Node-CLI/node-cli.js');

    var text = '';

    module.exports = function(string) {
        text += string;
        cli.clear().move(0, 0).write(text);
    };
})();
