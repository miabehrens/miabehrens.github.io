(function ($, _, Backbone, app) {

	app.views.PageView = Backbone.View.extend({

		events: {
		},

		initialize: function (options) {
			_.bindAll(this, "render", "show", "hide", "resetCssClass", "makeCurrentPage");

			this.animEndEventNames = {
				"WebkitAnimation" : "webkitAnimationEnd",
				"OAnimation" : "oAnimationEnd",
				"msAnimation" : "MSAnimationEnd",
				"animation" : "animationend"
			};

			// animation end event name
			this.animEndEventName = this.animEndEventNames[Modernizr.prefixed("animation")];
		},

		render: function () {
			this.$el.data("originalClassList", this.$el.attr("class"));

			if (this.model.get("Selected") === true) {
				this.makeCurrentPage();
			};

			return this;
		},

		show: function (wentBackwards) {
			return this.addAnimationClass(wentBackwards ? this.model.get("InAnimationBack") : this.model.get("InAnimation"));
		},

		hide: function (wentBackwards) {
			return this.addAnimationClass(wentBackwards ? this.model.get("OutAnimationBack") : this.model.get("OutAnimation"));
		},

		addAnimationClass: function (cssClass) {
			var that = this;

			this.$el.addClass("pt-page-" + cssClass).on(this.animEndEventName, function () {
				that.$el.off(that.animEndEventName);
				that.trigger("animationDone");
			});

			return this;
		},

		resetCssClass: function () {
			this.$el.attr("class", this.$el.data("originalClassList"));

			return this;
		},

		makeCurrentPage: function () {
			this.$el.addClass("pt-page-current");

			return this;
		}

	});
	
})(jQuery, _, Backbone, window.hypefolio);