// dependancies
var handlebars = require('handlebars');
var fs = require('fs');
var mkpath = require('mkpath');
var ncp = require('ncp').ncp;

// templates
var thrasherHtml1 = fs.readFileSync('src/templates/thrasher-1.html', 'utf8');
var thrasherCss1 = fs.readFileSync('build/css/thrasher-1.css', 'utf8');

var thrasherHtml2 = fs.readFileSync('src/templates/thrasher-2.html', 'utf8');
var thrasherCss2 = fs.readFileSync('build/css/thrasher-2.css', 'utf8');

var genericJson = fs.readFileSync('src/templates/html.json', 'utf8');
var snapHtml = fs.readFileSync('src/templates/snap.html', 'utf8');
var snapCss = fs.readFileSync('build/css/snap.css', 'utf8');
var homeHtml = fs.readFileSync('src/templates/index.html', 'utf8');
var fakeFrontend = fs.readFileSync('src/templates/fake-frontend.html', 'utf8');

// data
var podcasts = require('../src/podcasts.json');

for (var i = 0; i < podcasts.length; i++) {
    generateThrasher(podcasts[i]);
    generateSnap(podcasts[i]);
    generatePreview(podcasts[i]);
}

generateHomePage();
copyIllustrations();


function generateJson(data, css, template) {
  var htmlTemplate = handlebars.compile(template);
    data.css = css.replace(/handle/g, data.handle);
    data.html = JSON.stringify(htmlTemplate(data), null);

  var jsonTemplate = handlebars.compile(genericJson);
  return jsonTemplate(data);
}

function generateThrasher(data) {
    var designVersion = parseInt(data.designVersion);

    if(designVersion === 1){
      var thrasherJson1 = generateJson(data, thrasherCss1, thrasherHtml1);
      writeThrasher(data.handle, thrasherJson1)
    }
    else if (designVersion === 2){
      var thrasherJson2 = generateJson(data, thrasherCss2, thrasherHtml2);
      writeThrasher(data.handle, thrasherJson2)
    }
}

function writeThrasher (handle, json) {
  var path = 'build/thrasher/' + handle;
  mkpath(path, function() {
    fs.writeFile(path + '/source.json', json);
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
function generatePreview(data) {
  if(data.designVersion === 1) {
    var html = thrasherHtml1;
    var css = thrasherCss1;
  } else {
    var html = thrasherHtml2;
    var css = thrasherCss2;
  }

  handlebars.registerHelper('makeTitle', function(str) {
    var caps = str.charAt(0).toUpperCase() + str.slice(1);
    return caps.replace("-", " ");
  });

  var thrasherTemplate = handlebars.compile(html);
  data.css = css.replace(/handle/g, data.handle);
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

