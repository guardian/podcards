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



## Preview

1. Run `npm run paths` to get the local paths for the podcast you want to change. 
2. Run `npm run serve` to get the server running 
3. Run `npm run watch` in another tab to send live updates from the ./src folder to localhost 
4. Open the Code version of the Fronts Tool and go to /config. Choose a practice front, and add a new container to it.
5. Make sure the container has the right name(!). The name of the container will be downcapped and hyphenated to create 
the id of the container (eg. Football Weekly becomes the div id "football-weekly"), if the id is wrong this will affect 
your CSS. 
5. Back in the main Fronts tool, open the front you chose and open the container 
6. Back in Terminal, take the local path of your thrasher or snap and drag and drop (copying and pasting does something 
different) it into the new container. Hit 'Launch'
7. Check it out on the correct previewing link for your environment, something like this: 
`https://preview.code.dev-gutools.co.uk/your-front-name`. You normally need to refresh twice for the change to appear.



## Quick preview without the Fronts Tool

Run `npm run compile` to regenerate the build folder, and simply open the file you want to see from `build/preview`
 in your browser to check how it looks. 

NB: This is a rough preview tool with a fake version of front end- you'll need to check the code before publication by pasting the generated links into a container
in the Fronts Tool.