	var nano = {};

(function() {
	nano.Machine = function(options) {
		var internalApi = {
			transitionToState: function (newState) {
				if(options.states[newState]['_onEnter']) {
					options.states[newState]['_onEnter']();
				}
			}
		};
		
		function handleEvent(eventName) {
			if(options.states[options.initialState][eventName]) {
				options.states[options.initialState][eventName].call(internalApi);
			}
		}
		
		handleEvent('_onEnter');
		
		return {
			handle: handleEvent
		};
	};
})();