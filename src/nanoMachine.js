var NanoMachine = function(options) {
	options.states[options.initialState]._onEnter();
};