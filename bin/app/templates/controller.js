Package('{App}.Controllers', {
	{App} : new  Class({
		Extends: Sapphire.Controller,

		initialize : function()
		{
			this.parent();
			SAPPHIRE.application.listen('start', this.onStart.bind(this));
			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
		},

		onStart : function(callback)
		{
			callback();
		},

		onReady : function()
		{
			this.view = new Web.Views.{App}();
		}
	})
});

SAPPHIRE.application.registerController('{app}', new Web.Controllers.{App}());
