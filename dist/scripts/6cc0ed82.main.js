"use strict";var Game={Models:{},Collections:{},Views:{},Routers:{},models:{},collections:{},views:{},routers:{}},myCollection=[],wallCoordinates=[];Game.Views.AppView=Backbone.View.extend({initialize:function(){Game.collections.mapCollection=new Game.Collections.MapCollection,Game.collections.mapCollection.fetch().done(function(){myCollection=Game.collections.mapCollection.where({passage:!1}),wallCoordinates=myCollection.map(function(a){return{x:64*a.attributes.xCoord,y:64*(a.attributes.yCoord-1)}})}),Game.collections.mapCollection.comparator="position",this.listenTo(Game.collections.mapCollection,"sort",function(a){a.models.forEach(function(a){Game.views.map=new Game.Views.MapLook({model:a})})})}});var heroLocation={x:0,y:0},upcomingHeroLocation;$(window).keydown(function(a){37===a.keyCode?(event.preventDefault(),heroLocation.x>0?(upcomingHeroLocation=_.extend({},heroLocation),upcomingHeroLocation.x-=64,void 0===_.findWhere(wallCoordinates,upcomingHeroLocation)&&(heroLocation.x=heroLocation.x-64,$(".hero").css({"-webkit-transform":"matrix(1, 0, 0, 1, "+heroLocation.x+", "+heroLocation.y+")"}))):console.log("no move")):39===a.keyCode?(event.preventDefault(),heroLocation.x<=512?(upcomingHeroLocation=_.extend({},heroLocation),upcomingHeroLocation.x+=64,void 0===_.findWhere(wallCoordinates,upcomingHeroLocation)?(heroLocation.x=heroLocation.x+64,$(".hero").css({"-webkit-transform":"matrix(1, 0, 0, 1, "+heroLocation.x+", "+heroLocation.y+")"})):console.log("no move")):console.log("no move")):38===a.keyCode?(event.preventDefault(),heroLocation.y>0?(upcomingHeroLocation=_.extend({},heroLocation),upcomingHeroLocation.y-=64,void 0===_.findWhere(wallCoordinates,upcomingHeroLocation)&&(heroLocation.y=heroLocation.y-64,$(".hero").css({"-webkit-transform":"matrix(1, 0, 0, 1, "+heroLocation.x+", "+heroLocation.y+")"}))):console.log("no move")):40===a.keyCode&&(event.preventDefault(),heroLocation.y<=512?(upcomingHeroLocation=_.extend({},heroLocation),upcomingHeroLocation.y+=64,void 0===_.findWhere(wallCoordinates,upcomingHeroLocation)&&(heroLocation.y=heroLocation.y+64,$(".hero").css({"-webkit-transform":"matrix(1, 0, 0, 1, "+heroLocation.x+", "+heroLocation.y+")"}))):console.log("no move"))}),Game.Models.Character=Backbone.Model.extend({idAttribute:"_id",defaults:{heroClass:"",positionX:"0",positionY:"0",textureRight:"",textureLeft:"",health:"",weapon:""}}),Game.Collections.HeroCollection=Backbone.Collection.extend({model:Game.Models.Character,url:"http://tiny-pizza-server.herokuapp.com/collections/jdGameHero"}),Game.Views.Hero=Backbone.View.extend({template:_.template($(".hero-template-right").text()),leftTemplate:_.template($(".hero-template-left").text()),className:"hero",events:{"keydown window":"movement"},initialize:function(){$(".map-container").append(this.el),this.render();var a=this;$(window).keydown(function(b){37===b.keyCode?a.movement():39===b.keyCode&&a.render()})},render:function(){var a=this.template(this.model.attributes);this.$el.html(a)},movement:function(){var a=this.leftTemplate(this.model.attributes);this.$el.html(a)}}),Game.Views.Selection=Backbone.View.extend({template:_.template($(".character-option").text()),className:"hero-select-container",events:{click:"startGame"},initialize:function(){$(".selection-screen").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);this.$el.html(a)},startGame:function(){Game.views.hero=new Game.Views.Hero({model:this.model}),Game.models.mapPiece=new Game.Models.MapTile,Game.views.appView=new Game.Views.AppView({model:Game.models.mapPiece}),$(".selection-screen").hide(),$(".map-container").show(),Game.views.otherApp.remove(),Game.views.heroPick.remove()}}),Game.Views.SelectionScreen=Backbone.View.extend({initialize:function(){Game.collections.heroCollection=new Game.Collections.HeroCollection,Game.collections.heroCollection.fetch(),this.listenTo(Game.collections.heroCollection,"add",function(a){Game.views.heroPick=new Game.Views.Selection({model:a})})}}),Game.Models.MapTile=Backbone.Model.extend({idAttribute:"_id",defaults:{position:"",texture:"",passage:""}}),Game.Collections.MapCollection=Backbone.Collection.extend({model:Game.Models.MapTile,url:"http://tiny-pizza-server.herokuapp.com/collections/jdGameMap"}),Game.Views.MapLook=Backbone.View.extend({mapTemplate:_.template($(".map-template").text()),className:"map-piece",initialize:function(){$(".map-container").append(this.el),this.render()},render:function(){this.$el.css({background:"url("+this.model.attributes.texture+")"})}}),Game.models.hero=new Game.Models.Character,Game.views.otherApp=new Game.Views.SelectionScreen({model:Game.models.hero});