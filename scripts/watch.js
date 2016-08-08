// dependancies
var watch = require('node-watch');
var cmd = require('node-cmd');

watch('src', function(file) {
    console.log(file + ' has changed');
    cmd.run('npm run prewatch');
});