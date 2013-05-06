var nano = {} || nano;

(function() {
	nano.Machine = function(options) {
		var currentState,
			internalApi = {
				transitionToState: function (newState) {
					currentState = newState;
					
					executeEventHandler('_onEnter', Array.prototype.slice.call(arguments, 1));
				}
			};
		
		function executeEventHandler(eventName, argumentsArray) {
			var eventHandler = options.states[currentState][eventName];
			
			if(eventHandler) {
				eventHandler.apply(internalApi, argumentsArray);
			}
		}		
		
		internalApi.transitionToState(options.initialState);
		
		return {
			handle: function(eventName) {
				executeEventHandler(eventName, Array.prototype.slice.call(arguments, 1));
			}
		};
	};
})();