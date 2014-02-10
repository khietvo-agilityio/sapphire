Package('Sapphire', {
/**********************************************************************************
	Class: History

	This class manages browser history and deep linking. When included it is assumed
	that the second parameter passed to showPage is an object to be encoded on the pseudo-
	query string in the url hash
*/
	History : new Class({
		Extends : Sapphire.Eventer,

		initialize : function()
		{
			this.parent();

			this.first = false;
			SAPPHIRE.application.listenPageEvent('show', '', this.onPageShow.bind(this));
			SAPPHIRE.application.listen('start', this.onStart.bind(this));
		},

		handleFirst : function()
		{
			this.handleEvent(this.first);
		},

		parseEvent : function(event)
		{
			var result = {};
			var paths = event.path.split('/');
			var path = paths[paths.length - 1];
			result.page = path;
			result.query = (event.queryString != '')?event.queryString.parseQueryString():{};
			return result;
		},

		handleEvent : function(event)
		{
			var address = this.parseEvent(event);
			SAPPHIRE.application.showPage(address.page, address.query);
		},

		getFirst : function()
		{
			return this.parseEvent(this.first);
		},

		onStart : function(callback)
		{
			$.address.init(this.onInit.bind(this));
			$.address.change(this.onChange.bind(this));
			$.address.autoUpdate(false);
			callback();
		},

		onInit : function(event)
		{
			this.first  = event;
			this.fire('init', event);
		},

		onChange : function(event)
		{
			this.fire('change', event, this.first != false);
			if (this.first) this.first = false;
			this.handleEvent(event);
		},

		onPageShow : function(name, query)
		{
			var queryStr = Object.toQueryString(query);
			$.address.path(name);
			$.address.queryString(queryStr);
			$.address.update();
		}
	})
});

SAPPHIRE.history = new Sapphire.History();
