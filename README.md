# Catch-em-all

[![Gitter Chat Badge](https://badges.gitter.im/pokemongoers/Catch-em-all.svg)](https://gitter.im/pokemongoers/Catch-em-all?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Travis CI Badge](https://travis-ci.org/PokemonGoers/Catch-em-all.svg?branch=develop)](https://travis-ci.org/PokemonGoers/Catch-em-all?branch=develop)


This is project E of the WS 2016 JavaScript Technology seminar at the TU Munich. More details about the seminar at https://rostlab.org/owiki/index.php/Javascript_technology_2016-2

## Set up for development

In `./ionic2` run

`npm install -g cordova ionic@beta` to install ionic and cordova

`npm install` to install packages

`ionic serve` to start server

## Build app for deployment

### Using Docker

1. `docker build -t pokemongoers/catchemall .`

2. `docker run -p 8080:8080 pokemongoers/catchemall`

3. Go to `http://localhost:8080`

### Without Docker

1. In `./ionic2` run

    `npm install`

    `gulp build --release`

2. In `./server` run

    `npm install`

    `npm start`

3. Go to `http://localhost:8080`

## Testing

In `./server` run `npm test` for server tests.

In `./ionic2` run `npm test` for frontend/app tests.

## About this project

### Description
Now that we have tons of data about Pokemon (what they are, where they are, what’s their relationship, what they can transform into, which attacks they can perform, aso) we want to integrate it all into a comprehensive website.

This website should contain sections about each Pokemon and its details. Additionally, the website should register the user’s location and tell the user how close is that the predicted pokemon to him/her.

Additionally you will be incorporating the apps that were created by project B,C and D into the website. Your group will need to create automated builds and testing for this apps and use continuous integration to pull in new changes in the code repositories. Apps from projects B-D should be packaged and made available on NPM. Ideally when you completed these tasks the webapp component would integrate the apps by “requiring’ them.

Here is a possible user story: when a user opens the website or the app the current location of the user will be shown. Additionally, the website/app will show automatically where the pokemons that are currently active are and where the pokemons that we predict to active in the nearest future (i.e. within half a day) will be located (all of this will be available from the app developed in project D). Hopefully, the website will be somewhat crowded by that data. Then, there needs to be a menu bar or something available (e.g. above the map or on the right side to it) that will list currently active or predicted pokemons. Clicking on one of them will make other pokemons on the map disappear, except of this clicked one.
Separate web pages would allow the search and presentation of individual Pokemons and the information we gathered about them, including third party data (project A) and twitter analysis (project C)

### Milestones
First you will need to put all the apps developed in Projects B, C and D into the website that is developed in Project E. In this project you will pull the code from each project repository, compile it with the set of dependencies and package the apps, so that they can be easily called from the web site developed in project E. Then you will create the website that will publish all apps and enable the user interaction described above as well as possible interapp interactions.

### Outcome
- Create the shell of an Model-View-Control website
- Create the menus that will load the apps created in projects B-D
- Create the user interaction controls for the apps integrated and enable them
- Create an absolutely awesome UX/UI for the website with a really useful homepage :)
- Make arrangements to host the web site on a host that can scale for traffic demands (preferably there should be no cost associated with this step. Check Heroku, AWS, etc). We (mentors) can * also help with university resources.

## Team members
Our team consists of presentation groups 6, 9 and 10.

- @AlexanderLill Alexander Lill (Group 6)
- @philbu Philippe Buschmann (Group 6)
- @MajorBreakfast Josef Brandl (Group 6)
- @WoH Wolfgang Hobmaier (Group 9)
- @Georrgi Georgi Aylov (Group 9)
- @johartl Jochen Hartl (Group 9)
- @mfkaptan Mustafa Kaptan (Group 10)
- @Lugitan Gilles Tanson (Group 10)
