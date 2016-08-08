// dependancies
var static = require('node-static');

console.log("serving");

var file = new static.Server('./build', {
    'cache': 0,
    'headers': {
        'Access-Control-Allow-Origin': '*'
    }
});
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8080);