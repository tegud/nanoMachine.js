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
			var eventHandler = options.states[currentState][eventName];
			
			if(eventHandler) {
				eventHandler.call(internalApi);
			}
		}
		
		internalApi.transitionToState(options.initialState);
		
		return {
			handle: handleEvent
		};
	};
})();