(function ($, _, Backbone, app) {

	app.views.AppView = Backbone.View.extend({

		el: "#appView",

		events: {
			"click a[href=#prev]": "movePrevious",
			"click a[href=#next]": "moveNext"
		},

		initialize: function (options) {
			_.bindAll(this, "render", "moveNext", "movePrevious", "goToPage", "transitionPage", "onEndAnimation", "resetPage");

			this.pages = [];
			this.collection = new app.models.NavigationMenuItemCollection();
			this.currentPageIndex = 0;

			this.animcursor = 1;
			this.isAnimating = false;
			this.endCurrPage = false;
			this.endNextPage = false;
			this.animEndEventName = "animationDone";

			// support css animations
			this.support = Modernizr.cssanimations;

			this.listenTo(this.collection, "change:Selected", this.goToPage)
		},

		render: function () {
			var that = this;

			this.menuView = new app.views.NavigationMenuView({ collection: this.collection }).render();

			this.$main = this.$("#sectionContainer");
			this.$main.find("section.pt-page:not(.hide-from-menu)").each(function () {
				var model = new app.models.NavigationMenuItem({
					PageIndex: that.pages.length,
					Title: $(this).data("title"),
					SubTitle: $(this).data("subTitle"),
					Selected: that.pages.length === 0
				});

				that.collection.add(model);

				that.pages.push(new app.views.PageView({
					el: $(this)[0],
					model: model
				}).render());
			});

			this.$el.fitVids();

			Mousetrap.bind("left", this.movePrevious);
			Mousetrap.bind("right", this.moveNext);

			return this;
		},

		moveNext: function (event) {
			event.preventDefault();

			if (this.isAnimating) {
				return false;
			}

			var newPageIndex = this.currentPageIndex < this.pages.length - 1
								? this.currentPageIndex + 1
								: 0;

			this.collection.at(newPageIndex).setSelected();
		},

		movePrevious: function (event) {
			event.preventDefault();

			if (this.isAnimating) {
				return false;
			}

			var newPageIndex = this.currentPageIndex === 0
								? this.pages.length - 1
								: this.currentPageIndex - 1;

			this.collection.at(newPageIndex).setSelected();
		},

		goToPage: function (model, value, options) {
			if (value === true) {
				this.transitionPage(model.get("PageIndex"));
			};
		},

		transitionPage: function (newPageIndex) {
			if (this.isAnimating) {
				return false;
			}

			this.isAnimating = true;
			
			var that = this,
				currentPage = this.pages[this.currentPageIndex],
				nextPage = this.pages[newPageIndex].makeCurrentPage(),
				wentBackwards = newPageIndex + 1 === this.currentPageIndex || (this.currentPageIndex === 0 && newPageIndex === this.pages.length - 1);

			this.currentPageIndex = newPageIndex;

			currentPage.hide(wentBackwards).on(this.animEndEventName, function() {
				currentPage.off(that.animEndEventName);
				that.endCurrPage = true;

				if (that.endNextPage) {
					that.onEndAnimation(currentPage, nextPage );
				}
			});

			nextPage.show(wentBackwards).on(this.animEndEventName, function() {
				nextPage.off(that.animEndEventName);
				that.endNextPage = true;

				if (that.endCurrPage) {
					that.onEndAnimation(currentPage, nextPage);
				}
			});

			if (!this.support) {
				this.onEndAnimation(currentPage, nextPage);
			}
		},

		onEndAnimation: function (outpage, inpage) {
			this.endCurrPage = false;
			this.endNextPage = false;
			this.isAnimating = false;
			this.resetPage(outpage, inpage);
		},

		resetPage: function (outpage, inpage) {
			outpage.resetCssClass();
			inpage.resetCssClass().makeCurrentPage();
		}		

	});

	app.mainView = new app.views.AppView().render();
			
	window.addEventListener("load", function () {
		setTimeout(function () {
			// Hide the address bar!
			window.scrollTo(0, 1);
		}, 0);
	});
	
})(jQuery, _, Backbone, window.hypefolio);
