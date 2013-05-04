test('transitions to initial state', function() {
	var enteredStateA;
	
	new NanoMachine({
		states: {
			a: {
				_onEnter: function() {
					enteredStateA = true;
				}
			}
		},
		initialState: 'a'
	});
	
	ok(enteredStateA, 'did not enter initial state');
});