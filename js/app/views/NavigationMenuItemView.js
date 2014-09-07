(function ($, _, Backbone, app) {

	app.views.NavigationMenuItemView = Backbone.View.extend({

		tagName: "li",

		events: {
			"click a": "selectPage"
		},

		template: _.template([
			'<a href="#goToPage" data-page-index="{{ PageIndex }}">',
				'<div class="title">{{ Title }}</div>',
				'<div class="subtitle">{{ SubTitle }}</div>',
			'</a>'
		].join("\n")),

		initialize: function (options) {
			_.bindAll(this, "render", "selectPage");

			this.listenTo(this.model, "change", this.render);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			if (this.model.get("Selected") === true) {
				this.$el.addClass("selected");
			} else {
				this.$el.removeClass("selected");
			}

			return this;
		},

		selectPage: function (event) {
			event.preventDefault();

			this.model.setSelected();
		}

	});
	
})(jQuery, _, Backbone, window.hypefolio);