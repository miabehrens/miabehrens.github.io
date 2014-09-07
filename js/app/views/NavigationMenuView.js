(function ($, _, Backbone, app) {

	app.views.NavigationMenuView = Backbone.View.extend({

		el: "#dl-menu",

		events: {
		},

		initialize: function (options) {
			_.bindAll(this, "render", "appendMenuItem");

			this.listenTo(this.collection, "add", this.appendMenuItem)
		},

		render: function () {
			this.$el.dlmenu({
					animationClasses : { classin : "dl-animate-in-4", classout : "dl-animate-out-4" }
				});

			return this;
		},

		appendMenuItem: function (model, collection, options) {
			var menuItemView = new app.views.NavigationMenuItemView({ model: model });
			this.$("ul").append(menuItemView.render().el);
		}

	});
	
})(jQuery, _, Backbone, window.hypefolio);