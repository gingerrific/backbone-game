"use strict";

// Creates a new AppView Instance

Game.models.hero = new Game.Models.Character();
Game.views.otherApp = new Game.Views.SelectionScreen({model: Game.models.hero});