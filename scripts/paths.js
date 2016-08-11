// dependancies
var readlineSync = require('readline-sync');
var colors = require('colors');

// data
var podcasts = require('../src/podcasts.json');
var config = require('../scripts/config.json');

var arrayOfPodcasts = [];

for (var i = 0; i < podcasts.length; i++) {
    arrayOfPodcasts.push(podcasts[i].title);
}

var selectedPodcast = readlineSync.keyInSelect(arrayOfPodcasts, 'What podcast do ya wanna know about?');

console.log('Thrashers'.rainbow.bold.underline.inverse);
console.log('Local Url '.bold.yellow + returnPath('local', 'thrasher'));
console.log('Remote Url '.bold.green + returnPath('remote', 'thrasher'));

console.log('\nPodcard'.rainbow.bold.underline.inverse);
console.log('Local Url '.bold.yellow + returnPath('local', 'snap'));
console.log('Remote Url '.bold.green + returnPath('remote', 'snap'));

function returnPath(env, type) {
    return podcasts[selectedPodcast].url + '?gu-snapType=json.html&gu-snapUri=' + encodeURIComponent(config[env].url + (env == 'local' ? ":" + config.local.port : "") + "/" + type + "/" + podcasts[selectedPodcast].handle + '/source.json') + '&gu-headline=' + encodeURIComponent(podcasts[selectedPodcast].title) + '&gu-trailText=' + encodeURIComponent(podcasts[selectedPodcast].description);
}