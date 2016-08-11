// dependancies
var handlebars = require('handlebars');
var fs = require('fs');
var mkpath = require('mkpath');
var ncp = require('ncp').ncp;

// templates
var genericJson = fs.readFileSync('src/templates/html.json', 'utf8');
var thrasherHtml = fs.readFileSync('src/templates/thrasher.html', 'utf8');
var thrasherCss = fs.readFileSync('build/css/thrasher.css', 'utf8');
var snapHtml = fs.readFileSync('src/templates/snap.html', 'utf8');
var snapCss = fs.readFileSync('build/css/snap.css', 'utf8');

// data
var podcasts = require('../src/podcasts.json');

for (var i = 0; i < podcasts.length; i++) {
    generateThrasher(podcasts[i]);
    generateSnap(podcasts[i]);
}

copyIllustrations();

function generateThrasher(data) {
    var htmlTemplate = handlebars.compile(thrasherHtml);
        data.css = thrasherCss.replace(/handle/g, data.handle);
        data.html = JSON.stringify(htmlTemplate(data), null);

    var jsonTemplate = handlebars.compile(genericJson);
    var json = jsonTemplate(data);

    var path = 'build/thrashers/' + data.handle;
    mkpath(path, function() {
        fs.writeFile(path + '/source.json', json);
    });
}

function generateSnap(data) {
    var htmlTemplate = handlebars.compile(snapHtml);
        data.css = snapCss.replace(/handle/g, data.handle);
        data.html = JSON.stringify(htmlTemplate(data), null);

    var jsonTemplate = handlebars.compile(genericJson);
    var json = jsonTemplate(data);

    var path = 'build/snap/' + data.handle;
    mkpath(path, function() {
        fs.writeFile(path + '/source.json', json);
    });
}

function copyIllustrations() {
    copy('src/illustrations', 'build/illustrations', "Illustrations copied"); 
}

function copy(location, destination, message) {
    mkpath(destination, function() {
        ncp(location, destination, function(err) {
            if(err) {
                console.log(err);
            }
            console.log(message);
        });
    });
}

