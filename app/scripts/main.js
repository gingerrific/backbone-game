"use strict";

// Creates a new AppView Instance
Game.models.mapPiece = new Game.Models.MapTile();
Game.views.appView = new Game.Views.AppView({model: Game.models.mapPiece});