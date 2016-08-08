// dependancies
var readlineSync = require('readline-sync');
var colors = require('colors');

// data
var podcasts = require('../src/podcasts.json');

var arrayOfPodcasts = [];

for (var i = 0; i < podcasts.length; i++) {
    arrayOfPodcasts.push(podcasts[i].title);
}

var selectedPodcast = readlineSync.keyInSelect(arrayOfPodcasts, 'What podcast do ya wanna know about?');

console.log('Thrashers'.rainbow.bold.underline.inverse);
console.log('Local Url '.bold.yellow + returnSnapPath('http://localhost:8080/thrashers/' + podcasts[selectedPodcast].handle + '/source.json'));
console.log('Remote Url '.bold.green + returnSnapPath('https://interactive.guim.co.uk/podcasts/thrashers/' + podcasts[selectedPodcast].handle + '/source.json'));

console.log('\nPodcard'.rainbow.bold.underline.inverse);

function returnSnapPath(location) {
    return podcasts[selectedPodcast].url + '?gu-snapType=json.html&gu-snapUri=' + encodeURIComponent(location) + '&gu-headline=' + encodeURIComponent(podcasts[selectedPodcast].title) + '&gu-trailText=' + encodeURIComponent(podcasts[selectedPodcast].description);
}
