var nano = {};

(function() {
	nano.Machine = function(options) {
		var currentState,
			internalApi = {
				transitionToState: function (newState) {
					currentState = newState;
					
					handleEvent('_onEnter');
				}
			};
		
		function handleEvent(eventName) {
			if(options.states[currentState][eventName]) {
				options.states[currentState][eventName].call(internalApi);
			}
		}
		
		internalApi.transitionToState(options.initialState);
		
		return {
			handle: handleEvent
		};
	};
})();