"use strict";var Game={Models:{},Collections:{},Views:{},Routers:{},models:{},collections:{},views:{},routers:{}};Game.Views.AppView=Backbone.View.extend({events:{},initialize:function(){Game.collections.mapCollection=new Game.Collections.MapCollection,Game.collections.mapCollection.fetch(),this.listenTo(Game.collections.mapCollection,"add",function(a){Game.views.map=new Game.Views.MapLook({model:a})})}});var xCoord=320,yCoord=0;$(window).keydown(function(a){37==a.keyCode?xCoord>0?(xCoord-=80,$(".hero").css({"-webkit-transform":"matrix(1, 0, 0, 1, "+xCoord+", "+yCoord+")"})):console.log("no move"):39==a.keyCode?640>=xCoord?(xCoord+=80,$(".hero").css({"-webkit-transform":"matrix(1, 0, 0, 1, "+xCoord+", "+yCoord+")"})):console.log("no move"):38==a.keyCode?yCoord>0?(yCoord-=80,$(".hero").css({"-webkit-transform":"matrix(1, 0, 0, 1, "+xCoord+", "+yCoord+")"})):console.log("no move"):40==a.keyCode&&(640>=yCoord?(yCoord+=80,$(".hero").css({"-webkit-transform":"matrix(1, 0, 0, 1, "+xCoord+", "+yCoord+")"})):console.log("no move"))}),Game.Models.Character=Backbone.Model.extend({idAttribute:"_id",defaults:{heroClass:"",positionX:"0",positionY:"0",textureRight:"",textureLeft:"",health:"",weapon:""}}),Game.Collections.HeroCollection=Backbone.Collection.extend({model:Game.Models.Character,url:"http://tiny-pizza-server.herokuapp.com/collections/jdGameHero"}),Game.Views.Hero=Backbone.View.extend({template:_.template($(".hero-template").text()),className:"hero",initialize:function(){$(".map-container").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);this.$el.html(a)}}),Game.Views.Selection=Backbone.View.extend({template:_.template($(".character-option").text()),className:"hero-select-container",events:{click:"startGame"},initialize:function(){$(".selection-screen").append(this.el),this.render()},render:function(){var a=this.template(this.model.attributes);this.$el.html(a)},startGame:function(){Game.views.hero=new Game.Views.Hero({model:this.model}),Game.models.mapPiece=new Game.Models.MapTile,Game.views.appView=new Game.Views.AppView({model:Game.models.mapPiece}),Game.views.otherApp.remove(),$(".selection-screen").hide(),$(".map-container").show()}}),Game.Views.SelectionScreen=Backbone.View.extend({initialize:function(){Game.collections.heroCollection=new Game.Collections.HeroCollection,Game.collections.heroCollection.fetch(),this.listenTo(Game.collections.heroCollection,"add",function(a){Game.views.heroPick=new Game.Views.Selection({model:a})})}}),Game.Models.MapTile=Backbone.Model.extend({idAttribute:"_id",defaults:{position:"",texture:"",passage:""}}),Game.Collections.MapCollection=Backbone.Collection.extend({model:Game.Models.MapTile,url:"http://tiny-pizza-server.herokuapp.com/collections/jdGameMap"}),Game.Views.MapLook=Backbone.View.extend({mapTemplate:_.template($(".map-template").text()),className:"map-piece",initialize:function(){this.listenTo(Game.collections.mapCollection,"sort",this.render),$(".map-container").append(this.el),this.render()},render:function(){this.$el.css({background:"url("+this.model.attributes.texture+")"})}}),Game.models.hero=new Game.Models.Character,Game.views.otherApp=new Game.Views.SelectionScreen({model:Game.models.hero});