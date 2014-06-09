'use strict';

var Game = {
    // constructors
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},

    // instances
    models: {},
    collections: {},
    views: {},
    routers: {},
};



////////////////////////////////////////////////////////
/// App view ///////////////////////////////////////////
/// Init the collection and views //////////////////////
////////////////////////////////////////////////////////

// another way to render map tiles, unsorted
// this.listenTo(Game.collections.mapCollection, 'add', function (tile) {
	// console.log(tile);
	// Game.views.map = new Game.Views.MapLook({model:tile});
// });

// Initiate two variables to be used two store the location of the stone walls/detect collision
var myCollection = [];
var wallCoordinates = [];

Game.Views.AppView = Backbone.View.extend({

	initialize: function () {
		// Create a new map with the MapCollection constructor
		Game.collections.mapCollection = new Game.Collections.MapCollection();
		// Fetch the tile models
		Game.collections.mapCollection.fetch().done( function () {
			// Find the tiles that have a property passage of false and return them in a map
			myCollection = Game.collections.mapCollection.where({passage: false});
			wallCoordinates = myCollection.map( function (array) {
				return {'xCoord':array.attributes.xCoord*64, 'yCoord':(array.attributes.yCoord - 1) * 64};
			});

			
		});
		// Set the sort attribute as each tile's position
		Game.collections.mapCollection.comparator = 'position';
		// When the tiles are fetched, they will sort and on this event forEach over the results.models
		this.listenTo(Game.collections.mapCollection, 'sort', function (collObj) {
			collObj.models.forEach(function (tile) {
				// Create a new Map View with these sorted models
				Game.views.map = new Game.Views.MapLook({model:tile});
			});
		});
	}
});

// Initiate the hero location variables as numbers and start coordinates of (0,0)
// var xCoord = 0;
// var yCoord = 0;
var heroLocation = {xCoord:0, yCoord:0};
// initiates what will be used as a copy of the hero location
var upcomingHeroLocation;


// hero character movement
$(window).keydown( function (key) {

	// left arrow
	if (key.keyCode === 37) {
		event.preventDefault();
		// Filter out commands if you're at the edge of the board
		if (heroLocation.xCoord > 0 ) {
			// Create a copy of current location and test if the next move would move you into an stone wall
			upcomingHeroLocation = _.extend({}, heroLocation);
			upcomingHeroLocation.xCoord -= 64;
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 64px and moving in increments of 64 will move the character to each tile
				heroLocation.xCoord = heroLocation.xCoord - 64;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.xCoord+', '+heroLocation.yCoord+')'}); // X movement
			}
		}
		else {
			console.log('no move');
		}
	}
	// right arrow
	else if (key.keyCode === 39) {
		event.preventDefault();
		// Filter out commands if you're at the edge of the board
		if (heroLocation.xCoord <= 512) {
			// Create a copy of current location and test if the next move would move you into an stone wall
			upcomingHeroLocation = _.extend({}, heroLocation);
			upcomingHeroLocation.xCoord += 64;
			//	findWhere will return the location where these objects have the same properties (x,y). If it's return is undefined, there is no conflict.
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 64px and moving in increments of 64 will move the character to each tile
				heroLocation.xCoord = heroLocation.xCoord + 64;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.xCoord+', '+heroLocation.yCoord+')'}); // X movement
			}
			else {
				console.log('no move');
			}
		}
		else {
			console.log('no move');
		}
	}
	// up arrow
	else if (key.keyCode === 38) {
		event.preventDefault();
		// Filter out commands if you're at the edge of the board
		if (heroLocation.yCoord > 0) {
			// Create a copy of current location and test if the next move would move you into an stone wall
			upcomingHeroLocation = _.extend({}, heroLocation);
			upcomingHeroLocation.yCoord -= 64;
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 64px and moving in increments of 64 will move the character to each tile
				heroLocation.yCoord = heroLocation.yCoord - 64;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.xCoord+', '+heroLocation.yCoord+')'}); // Y movement
			}
		}
		else {
			console.log('no move');
		}
	}
	// down arrow
	else if (key.keyCode === 40) {
		event.preventDefault();
		// Filter out commands if you're at the edge of the board
		if (heroLocation.yCoord <= 512) {
			// Create a copy of current location and test if the next move would move you into an stone wall
			upcomingHeroLocation = _.extend({}, heroLocation);
			upcomingHeroLocation.yCoord += 64;
			if (_.findWhere(wallCoordinates, upcomingHeroLocation) === undefined) {
				// Each tile is 64px and moving in increments of 64 will move the character to each tile
				heroLocation.yCoord = heroLocation.yCoord + 64;
				$('.hero').css({'-webkit-transform': 'matrix(1, 0, 0, 1, '+heroLocation.xCoord+', '+heroLocation.yCoord+')'}); // Y movement
			}
		}
		else {
			console.log('no move');
		}
	}

	else if (key.keyCode === 32) {
		var bombLocation = _.extend({}, heroLocation); 
		bombLocation.xCoord = bombLocation.xCoord/64
		bombLocation.yCoord = (bombLocation.yCoord/64)+1
		var bombSite = Game.collections.mapCollection.where(bombLocation)
		bombSite[0].set('bomb', true);

		setTimeout (function () {
			console.log('bombin');
			bombSite[0].set('bomb', false);
		}, 3000)

		var bombLocation1 = _.extend({}, heroLocation);
		var bombLocation2 = _.extend({}, heroLocation);
		var bombLocation3 = _.extend({}, heroLocation);
		var bombLocation4 = _.extend({}, heroLocation);
		var bombLocation6 = _.extend({}, heroLocation);
		var bombLocation7 = _.extend({}, heroLocation);
		var bombLocation8 = _.extend({}, heroLocation);
		var bombLocation9 = _.extend({}, heroLocation);


		// top left corner
		bombLocation1.xCoord = (bombLocation1.xCoord/64)-1
		bombLocation1.yCoord = (bombLocation1.yCoord/64)
		// top middle
		bombLocation2.xCoord = (bombLocation2.xCoord/64)
		bombLocation2.yCoord = (bombLocation2.yCoord/64)
		// top right corner
		bombLocation3.xCoord = (bombLocation3.xCoord/64)+1
		bombLocation3.yCoord = (bombLocation3.yCoord/64)
		// middle left
		bombLocation4.xCoord = (bombLocation4.xCoord/64)-1
		bombLocation4.yCoord = (bombLocation4.yCoord/64)+1
		// middle right
		bombLocation6.xCoord = (bombLocation6.xCoord/64)+1
		bombLocation6.yCoord = (bombLocation6.yCoord/64)+1
		// bottom left
		bombLocation7.xCoord = (bombLocation7.xCoord/64)-1
		bombLocation7.yCoord = (bombLocation7.yCoord/64)+2
		// bottom middle
		bombLocation8.xCoord = (bombLocation8.xCoord/64)
		bombLocation8.yCoord = (bombLocation8.yCoord/64)+2
		//bottom right
		bombLocation9.xCoord = (bombLocation9.xCoord/64)+1
		bombLocation9.yCoord = (bombLocation9.yCoord/64)+2

		// console.log(bombLocation1.xCoord);
		// console.log(bombLocation1.yCoord);
		// console.log(bombLocation2.xCoord);
		// console.log(bombLocation2.yCoord);
		// console.log(bombLocation3.xCoord);
		// console.log(bombLocation3.yCoord);
		// console.log(bombLocation4.xCoord);
		// console.log(bombLocation4.yCoord);
		// console.log(bombLocation6.xCoord);
		// console.log(bombLocation6.yCoord);
		// console.log(bombLocation7.xCoord);
		// console.log(bombLocation7.yCoord);
		// console.log(bombLocation8.xCoord);
		// console.log(bombLocation8.yCoord);
		// console.log(bombLocation9.xCoord);
		// console.log(bombLocation9.yCoord);
		setTimeout(function () {

			var blast1 = Game.collections.mapCollection.where(bombLocation1)
			blast1[0].set('flash', true)
			var blast2 = Game.collections.mapCollection.where(bombLocation2)
			blast2[0].set('flash', true)
			var blast3 = Game.collections.mapCollection.where(bombLocation3)
			blast3[0].set('flash', true)
			var blast4 = Game.collections.mapCollection.where(bombLocation4)
			blast4[0].set('flash', true)
			var blast6 = Game.collections.mapCollection.where(bombLocation6)
			blast6[0].set('flash', true)
			var blast7 = Game.collections.mapCollection.where(bombLocation7)
			blast7[0].set('flash', true)
			var blast8 = Game.collections.mapCollection.where(bombLocation8)
			blast8[0].set('flash', true)
			var blast9 = Game.collections.mapCollection.where(bombLocation9)
			blast9[0].set('flash', true)

			setTimeout(function () {
				blast1[0].set('flash', false)
				blast2[0].set('flash', false)
				blast3[0].set('flash', false)
				blast4[0].set('flash', false)
				blast6[0].set('flash', false)
				blast7[0].set('flash', false)
				blast8[0].set('flash', false)
				blast9[0].set('flash', false)
			}, 100)
		},2900)

		
	}
});

