/********************************************************************************
	This is the only bit you should need to change. The rest is just plumbing
*********************************************************************************/
var thingsToUpload = [
	{
		files: '**/*',
		headers: {
			CacheControl: 'max-age=0'
		}
	}
];

/********************************************************************************
	Only change this bit if you know what you're doing...
*********************************************************************************/

var path = require( 'path' );
var fs = require( 'fs' );
var mime = require( 'mime' );
var AWS = require( 'aws-sdk' );
var glob = require( 'glob' );
var filesize = require( 'filesize' );
var stevedore = require( 'stevedore' );
var chalk = require( 'chalk' );

var config = require( './config.json' );

var BASE_DIR = path.resolve( 'build' );
var FILES_TO_IGNORE = ['preview/*'];
var MAX_CONCURRENT_UPLOADS = 8;

try {
	var CREDENTIALS = new AWS.SharedIniFileCredentials({profile: 'interactives'});
	AWS.config.credentials = CREDENTIALS;
} catch ( err ) {
	var message = 'Could not find AWS credentials. Make sure they have been added to ~/.aws/credentials';

	console.log( message );
	process.exit( 1 );
}

var s3 = new AWS.S3();

var uploadQueue = [];

thingsToUpload.forEach( function ( thing ) {
	var files = glob.sync( thing.files, {
		cwd: BASE_DIR,
		nodir: true,
		ignore: FILES_TO_IGNORE
	});

	files.forEach( function ( file ) {
		uploadQueue.push({
			file: file,
			headers: thing.headers
		});
	});
});

var inFlight = 0;
var loader;

while ( inFlight < MAX_CONCURRENT_UPLOADS && uploadQueue.length ) {
	uploadNextItem();
}

function uploadNextItem () {
	var item = uploadQueue.shift();

	if ( !item ) {
		if ( !loader ) {
			loader = stevedore();
		}

		loader.message( inFlight + ' items remaining    ' );

		if ( !inFlight ) {
			loader.stop();
			console.log( '\nupload complete!' );
		}

		return;
	}

	inFlight += 1;

	var data = fs.readFileSync( path.join( BASE_DIR, item.file ) );

	var options = {
		Bucket: config.remote.bucket,
		ACL: 'public-read',
		Key: config.remote.path + '/' + item.file,
		Body: data,
		ContentType: mime.lookup( item.file )
	};

	Object.keys( item.headers ).forEach( function ( header ) {
		options[ header ] = item.headers[ header ];
	});

	console.log( '* %s : %s', pad( filesize( data.length ), 12 ), item.file );

	s3.putObject( options, function ( err ) {
		if ( err ) {
			console.log( 'err', err );
			throw err;
		}

		inFlight -= 1;
		uploadNextItem();
	});
}

function pad ( str, len ) {
	while ( str.length < len ) str += ' ';
	return str;
}
