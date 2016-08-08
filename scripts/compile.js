// dependancies
var handlebars = require('handlebars');
var fs = require('fs');
var mkpath = require('mkpath');

// templates
var thrasherHtml = fs.readFileSync('src/templates/thrasher.html', 'utf8');
var thrasherJson = fs.readFileSync('src/templates/thrasher.json', 'utf8');

// data
var podcasts = require('../src/podcasts.json');

for (var i = 0; i < podcasts.length; i++) {
    generateThrasherCode(podcasts[i]);
}

function generateThrasherCode(data) {
    var htmlTemplate = handlebars.compile(thrasherHtml);
        data.html = JSON.stringify(htmlTemplate(data), null);

    var jsonTemplate = handlebars.compile(thrasherJson);
    var json = jsonTemplate(data);

    var path = 'build/thrashers/' + data.handle;
    mkpath(path, function() {
        fs.writeFile(path + '/source.json', json);
    });
}

