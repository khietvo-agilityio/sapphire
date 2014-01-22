
Package('Sapphire', {
	Templates : new Class({
		Extends : Sapphire.Eventer,

		initialize : function()
		{
			SAPPHIRE.application.listenPageEvent('load', '', this.onLoad.bind(this));
			SAPPHIRE.application.listenDialogEvent('load', '', this.onLoad.bind(this));
			SAPPHIRE.application.listen('start', this.onStart.bind(this));
			this.templates = $H({});
		},

		grab : function()
		{
			$('.template').each(function(which, element)
			{
				var selector = $(element);
				var id = selector.attr('id');
				selector.removeClass('template');
				this.templates[id] = selector.remove();
			}.bind(this));
		},

		get : function(which)
		{
			if (this.templates.has(which))
				return this.templates[which].clone(true, true);
			else
				return null;
		},

		onStart : function(callback)
		{
			this.grab();
			callback();
		},

		onLoad : function()
		{
			this.grab();
		}
	})
});

SAPPHIRE.templates = new Sapphire.Templates();
