test('transitions to initial state', function() {
	var enteredStateA;
	
	new nano.Machine({
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

test('initial state with no _onEnter handler does not throw an exception', function() {
	var exceptionThrown;
	
	try
	{
		new nano.Machine({
			states: {
				a: { }
			},
			initialState: 'a'
		});
	}
	catch (e) {
		exceptionThrown = true;
	}
	
	ok(!exceptionThrown, 'exception thrown');
});

test('handle calls the event name on the current state', function() {
	var eventHandlerCalled,
		machine;
	
	machine = new nano.Machine({
		states: {
			a: {
				anEvent: function() {
					eventHandlerCalled = true;
				}
			}
		},
		initialState: 'a'
	});
	
	machine.handle('anEvent');
	
	ok(eventHandlerCalled, 'did not enter initial state');
});

test('events are passed object with transitionToState method in "this" context', function() {
	var transitionToStateMethod,
		machine;
	
	machine = new nano.Machine({
		states: {
			a: {
				anEvent: function() {
					transitionToStateMethod = this.transitionToState;
				}
			}
		},
		initialState: 'a'
	});
	
	machine.handle('anEvent');
	
	equal(typeof transitionToStateMethod, 'function', 'no transitionToState method');
});

test('events are passed object with transitionToState method in "this" context', function() {
	var transitionToStateMethod,
		machine;
	
	machine = new nano.Machine({
		states: {
			a: {
				anEvent: function() {
					transitionToStateMethod = this.transitionToState;
				}
			}
		},
		initialState: 'a'
	});
	
	machine.handle('anEvent');
	
	equal(typeof transitionToStateMethod, 'function', 'no transitionToState method');
});

test('transitionToState method moves the machine into the specified state', function() {
	var enteredStateB,
		machine;
	
	machine = new nano.Machine({
		states: {
			a: {
				anEvent: function() {
					this.transitionToState('b');
				}
			},
			b: {
				_onEnter: function() {
					enteredStateB = true;
				}
			}
		},
		initialState: 'a'
	});
	
	machine.handle('anEvent');
	
	ok(enteredStateB, 'did not transition to state B');
});

test('can transition between states from _onEnter', function() {
	var enteredStateB,
		machine;
	
	machine = new nano.Machine({
		states: {
			a: {
				_onEnter: function() {
					this.transitionToState('b');
				}
			},
			b: {
				_onEnter: function() {
					enteredStateB = true;
				}
			}
		},
		initialState: 'a'
	});
	
	ok(enteredStateB, 'did not transition to state B');
});

test('handle calls event handler on new state after transition', function() {
	var	anEventOnStateBCalled,
		machine;
	
	machine = new nano.Machine({
		states: {
			a: {
				_onEnter: function() {
					this.transitionToState('b');
				},
				anEvent: function() {
				}
			},
			b: {
				anEvent: function() {
					anEventOnStateBCalled = true;
				}
			}
		},
		initialState: 'a'
	});
	
	machine.handle('anEvent');
	
	ok(anEventOnStateBCalled, 'did not call anEvent on state B');
});

test('calling handle with an event that does not exist on the current state does not cause an exception', function() {
	var exceptionThrown,
		machine = new nano.Machine({
			states: {
				a: { }
			},
			initialState: 'a'
		});
	
	try
	{
		machine.handle('doesNotExist');
	}
	catch (e) {
		exceptionThrown = true;
	}
	
	ok(!exceptionThrown, 'exception thrown');
});

test('handle passes arguments after eventName to event handler', function() {
	var expectedArguments = [12345, 678910],
		actualArguments,
		machine = new nano.Machine({
			states: {
				a: {
					anEvent: function() {
						actualArguments = Array.prototype.slice.call(arguments);
					}
				}
			},
			initialState: 'a'
		});
	
	machine.handle('anEvent', 12345, 678910);
	
	deepEqual(actualArguments, expectedArguments, 'arguments passed to event handler are not correct');
});

test('transitionToState passes arguments after new state name to _onEnter event', function() {
	var expectedArguments = [12345, 678910],
		actualArguments,
		machine = new nano.Machine({
			states: {
				a: {
					_onEnter: function() {
						this.transitionToState('b', 12345, 678910);
					}
				},
				b: {
					_onEnter: function() {
						actualArguments = Array.prototype.slice.call(arguments);
					}
				}
			},
			initialState: 'a'
		});
	
	deepEqual(actualArguments, expectedArguments, 'arguments passed to _onEnter are not correct');
});