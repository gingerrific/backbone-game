"use strict";

////////////////////////////////////////////////////////
/// Model //////////////////////////////////////////////
////////////////////////////////////////////////////////

// Map Tile Model
Game.Models.MapTile = Backbone.Model.extend({

	idAttribute: '_id',
	defaults: {
		position: '', // location on the game map
		texture: '', // what the piece looks like 
		passage: '' // whether or not the tile can be stepped on
	}
});

////////////////////////////////////////////////////////
/// Collection /////////////////////////////////////////
////////////////////////////////////////////////////////

// Collection of available map tiles
Game.Collections.MapCollection = Backbone.Collection.extend({
	model: Game.Models.MapTile,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/jdGameMap'
});


////////////////////////////////////////////////////////
/// Views //////////////////////////////////////////////
////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
/// Map view ///////////////////////////////////////////
/// Look of the game's map /////////////////////////////
////////////////////////////////////////////////////////

Game.Views.MapLook = Backbone.View.extend({
	mapTemplate: _.template($('.map-template').text()),
	className: 'map-piece',

	initialize: function () {
		this.listenTo(this.model, 'change', this.bombTile)
		$('.map-container').append(this.el);
		this.render();
	},
	// uses the current model texture as the background of the tile/div
	render: function () {
			var renderedTemplate = this.mapTemplate();
			this.$el.html(renderedTemplate);
			this.$el.css({background: 'url('+this.model.attributes.texture+')'});
	},

	bombTile: function () {
		this.$('div').addClass('bomb-tile');
		// console.log($(this.el));
	}
});

