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
var homeHtml = fs.readFileSync('src/templates/index.html', 'utf8');
var fakeFrontend = fs.readFileSync('src/templates/fakeFrontend.html', 'utf8');

// data
var podcasts = require('../src/podcasts.json');

for (var i = 0; i < podcasts.length; i++) {
    generateThrasher(podcasts[i]);
    generateSnap(podcasts[i]);
    generatePreview(podcasts[i]);
}

generateHomePage();
copyIllustrations();


function generateJson(data, css, template){
  var htmlTemplate = handlebars.compile(template);
    data.css = css.replace(/handle/g, data.handle);
    data.html = JSON.stringify(htmlTemplate(data), null);

  var jsonTemplate = handlebars.compile(genericJson);
  return jsonTemplate(data);
}

function generateThrasher(data) {
    var thrasherJson = generateJson(data, thrasherCss, thrasherHtml);
    var path = 'build/thrasher/' + data.handle;
    mkpath(path, function() {
        fs.writeFile(path + '/source.json', thrasherJson);
    });
}

function generateSnap(data) {
  var snapJson = generateJson(data, snapCss, snapHtml);
  var path = 'build/snap/' + data.handle;
  mkpath(path, function() {
    fs.writeFile(path + '/source.json', snapJson);
  });
}


// preview for viewing thrashers on localhost
function generatePreview(data){
  var thrasherTemplate = handlebars.compile(thrasherHtml);
  data.css = thrasherCss.replace(/handle/g, data.handle);
  handlebars.registerPartial('thrasherPartial', thrasherTemplate(data));

  var fakeFrontendTemplate = handlebars.compile(fakeFrontend);
  var frontendData = { handle: data.handle };
  var thrasherInFrontend = fakeFrontendTemplate(frontendData);

  var path = 'build/preview';
  mkpath(path, function() {
    fs.writeFile(path + '/' + data.handle + '.html', thrasherInFrontend);
  });
}

function generateHomePage() {
    var htmlTemplate = handlebars.compile(homeHtml);
    fs.writeFile('build/index.html', htmlTemplate(podcasts));
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

