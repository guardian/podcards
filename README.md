Guardian Podcards
========================

A way to autogenerate on-site assets for our podcasts

## Installation

Get dependencies by running `npm install`.

Make sure sass is installed by running `npm install -g sass`

If you don't have them added you'll need to add your s3 keys for the gdn-interactive s3 server to your `~/.aws/credentials` file.

## Usage

* `npm run paths` to output snap paths for the thrashers and podcards
* `npm run serve` to serve the json files locally
* `npm run watch` to watch for changes to the `./src` folder
* `npm run deploy` to deploy to the server


## To preview locally

Run `npm run serve` to build the latest version of the thrashers and check localhost:8080 to view them in a faked version 
of Frontend. This simply serves out the latest version from the build folder.

Alternatively, run `npm compile` to regenerate the build folder, and simply open the file you want to see from `build/preview`
 in your browser to check how it looks. 

NB: This is a rough preview tool - you'll need to check the code before publication by pasting the generated links into a container
in the Fronts Tool.