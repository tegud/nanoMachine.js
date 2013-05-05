	var nano = {};

(function() {
	nano.Machine = function(options) {
		var currentState,
			internalApi = {
				transitionToState: function (newState) {
					currentState = newState;
					
					if(options.states[currentState]['_onEnter']) {
						options.states[currentState]['_onEnter']();
					}
				}
			};
		
		function handleEvent(eventName) {
			if(options.states[currentState][eventName]) {
				options.states[currentState][eventName].call(internalApi);
			}
		}
		
		currentState = options.initialState;
		handleEvent('_onEnter');
		
		return {
			handle: handleEvent
		};
	};
})();