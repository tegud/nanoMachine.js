nanoMachine.js
==============

A micro Finite State Machine implementation in JavaScript.  Similar in principle to machina.js but with a focus on being a cutdown, simple Finite State Machine implementation.

Usage
=====

Include the nanoMachine.js file, and then create a new nano.Machine() object, supports the following options:

* states [required] - an object representing the allowed states for the Finite State Machine, properties of each state then represent the state's valid event handlers
* initialState [required] - the state which the machine will move into immediately.

License
=======
There's really not a lot to this, it would be quite simple to recreate and therefore you can do whatever you want with this code, fork it, copy it, clone it, use it for commercial purposes, it really doesn't matter.  Was created for my own use and as part of the blog article I wrote (link to come).
