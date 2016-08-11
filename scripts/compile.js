// dependancies
var handlebars = require('handlebars');
var fs = require('fs');
var mkpath = require('mkpath');
var ncp = require('ncp').ncp;

// templates
var thrasherHtml = fs.readFileSync('src/templates/thrasher.html', 'utf8');
var thrasherCss = fs.readFileSync('build/css/thrasher.css', 'utf8');
var thrasherJson = fs.readFileSync('src/templates/thrasher.json', 'utf8');
var snapHtml = fs.readFileSync('src/templates/snap.html', 'utf8');
var snapCss = fs.readFileSync('build/css/snap.css', 'utf8');

// data
var podcasts = require('../src/podcasts.json');

for (var i = 0; i < podcasts.length; i++) {
    generateThrasher(podcasts[i]);
    generateSnap(podcasts[i]);
}

copyIllustrations();
copyFonts();

function generateThrasher(data) {
    var htmlTemplate = handlebars.compile(thrasherHtml);
        data.css = thrasherCss.replace(/handle/g, data.handle);
        data.html = JSON.stringify(htmlTemplate(data), null);

    var jsonTemplate = handlebars.compile(thrasherJson);
    var json = jsonTemplate(data);

    var path = 'build/thrashers/' + data.handle;
    mkpath(path, function() {
        fs.writeFile(path + '/source.json', json);
    });
}

function generateSnap(data) {
    var htmlTemplate = handlebars.compile(snapHtml);
        data.css = snapCss.replace(/handle/g, data.handle);
        data.html = htmlTemplate(data), null;

    var html = htmlTemplate(data);

    var path = 'build/snap/' + data.handle;
    mkpath(path, function() {
        fs.writeFile(path + '/index.html', html);
    });
}

function copyIllustrations() {
    copy('src/illustrations', 'build/illustrations', "Illustrations copied"); 
}

function copyFonts() {
    copy('src/fonts', 'build/fonts', "Fonts copied");
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

