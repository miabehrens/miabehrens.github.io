(function ($, _, Backbone, app) {

	app.models.NavigationMenuItem = Backbone.Model.extend({

		defaults: {
			PageIndex: -1,
			Selected: false,
			Title: "",
			SubTitle: "",
			Description: "",
			InAnimation: "moveFromRight",
			OutAnimation: "moveToLeft",
			InAnimationBack: "moveFromLeft",
			OutAnimationBack: "moveToRight"
		},

		initialize: function (options) {
			_.bindAll(this, "setSelected");

			this.on("change:Selected", this.toggleSelected, this);
		},

		setSelected: function () {
			this.collection.setSelectedItem(this);
		}

	});
	
})(jQuery, _, Backbone, window.hypefolio);