(function ($, _, Backbone, app) {

	app.models.NavigationMenuItemCollection = Backbone.Collection.extend({

		model: app.models.NavigationMenuItem,

		initialize: function (options) {
			_.bindAll(this, "setSelectedItem");

			this.selectedItem = null;
		},

		add: function (item) {
		     if (!this.selectedItem) {
		     	this.selectedItem = item;
		     }

		     Backbone.Collection.prototype.add.call(this, item);
		  },

		setSelectedItem: function (item) {
			this.selectedItem.set("Selected", false);
			this.selectedItem = item;
			this.selectedItem.set("Selected", true);
		}

	});
	
})(jQuery, _, Backbone, window.hypefolio);