/*=====================
COMPILER SPEAK
====================*/

console.log(a);
// The reference to a here is an RHS reference. Nothing is being assigned here, we just want to know what the value of a is so we can pass it to console.log
a = 2;
// The referenece to a here is an LHS reference. We don’t care what the actual value of a is, we just want to find the variable as a target for the = 2 operation

function foo(a) {
  console.log(a); // 2
}

foo(2);

/*
The call to foo(…)  on the last line requires an RHS reference to look up the value of foo. In addition, the (…) means that the value of foo should be executed, so it better be a function or we’d get an error.
The key to this example is the subtle, but important assignment that takes place. When the value 2 is passed as an argument to foo(..), 2 as a value is assigned to the parameter a implicitly. 
This implicit assignment to a parameter requires an LHS look-up. We don’t care that the value is 2, we just need to find the variable to assign it to (LHS).
There’s also an RHS reference for the value of a as well. This happens in the console.log(…) statement within foo(…)’s definition.
*/

function foo(a) {
  var b = a;
  return a + b;
}

var c = foo(2);

/*QUIZ TIME
1.	In the example above, identify all the LHS look-ups (hint: there are 3)
2.	In the example above, identify all the RHS look-ups (hint: there are 4)
*/


/*=====================
NESTED SCOPE
====================*/

function foo(a) {
  console.log(a + b);
}

var b = 2;

foo(2); // 4

// The RHS reference for b cannot be resolved inside the function foo, but it can be resolved in the Scope surrounding it (in this case, the global).
// 1.	The engine sees an RHS reference for b, and consults the scope of foo to ask if it has heard of it
// 2.	Scope of foo has no knowledge of b, so it tells the engine to look up
// 3.	The engine talks to the scope outside of foo, and, seeing that it’s the global scope, asks if it has heard of b
// 4.	The scope at the global level knows what b is, and returns this info back to the engine

/*=====================
ERRORS
====================*/

function foo(a) {
  console.log(a + b);
  b = a;
}

foo(2);

// RHS look up fails, RefError (whereas LHS lookup in non strict mode would create a reference implicitly once it hits global scope)


/*=====================
LEX-TIME
====================*/

function foo(a) {
  var b = a * 2;

  function bar(c) {
    console.log(a, b, c);
  }

  bar(b * 3);
}

foo(2); // 2 4 12

/*=====================
CHEATING LEXICAL
====================*/

function foo(str, a) {
  eval(str); // cheating!
  console.log(a, b);
}

var b = 2;
foo("var b = 3;", 1); // 1, 3


/*=====================
SCOPE FROM FUNCTIONS
====================*/

function foo(a) {
  var b = 2;

  function bar() {
    // ...
  }

  // more code

  var c = 3;
}

/*=====================
HIDING IN PLAIN SCOPE
====================*/

function doSomething(a) {
    b = a + doSomethingElse(a * 2);

    console.log(b * 3);
}

function doSomethingElse(a) {
  return a - 1;
}

var b;

doSomething(2);


//A better way
function doSomething(a) {
  function doSomethingElse(a) {
    return a - 1;
  }

  var b;

  b = a + doSomethingElse(a * 2);

  console.log(b * 3);

}

doSomething(2);


/*=====================
COLLISION AVOIDANCE
====================*/

function foo() {
  function bar(a) {
      i = 3;
      console.log(a + i);
  }

  for (var i = 0; i < 10; i++) {
      bar(i * 2);
  }
}

foo();

/*=====================
GLOBAL "NAMESPACES"
====================*/

var MyReallyCoolLibrary = {
  awesome: "stuff",
  doSomething: function() {
    //...
  },
  doAnotherThing: function() {
    //...
  }
};

/*=====================
FUNCTIONS AS SCOPES
====================*/

var a = 2;

function foo() {
  var a = 3;
  console.log(a);
}

foo();

console.log(a);

//Let's address these issues
var a = 2;

(function foo() {
  var a = 3;
  console.log(a);
})();

console.log(a);

/*=====================
ANONYMOUS VS NAMED
====================*/

setTimeout(function() {
  console.log("I waited 1 second");
}, 1000);

/*=====================
INLINE FUNCTION EXPRESSIONS
====================*/

setTimeout(function timeoutHandler() {
  console.log("I waited 1 second");
}, 1000);

/*=====================
INVOKING FUNCTION EXPRESSIONS IMMEDIATELY
====================*/

var a = 2;

(function foo() {
  var a = 3;
  console.log(a); // 3
})();

console.log(a); // 2


/*=====================
PASSING ARGUMENTS TO IIFFE
====================*/

var a = 2;

(function IIFE(global) {
  var a = 3;
  console.log(a); // 3
  console.log(global.a); // 2
})(window);

console.log(a); // 2


/*=====================
BLOCKS AS SCOPES
====================*/

for (var i = 0; i < 10; i++) {
  console.log(i);
}

console.log('GLOBAL', i);

/*=====================
TRY/CATCH BLOCK
====================*/

try {
  undefined();
}
catch(err) {
  console.log(err);
}

console.log(err);


/*=====================
LET (ES6)
====================*/

var foo = true;

if (foo) {
  let bar = foo * 2;
  bar = something(bar);
  console.log(bar);
}

console.log(bar);

/*=====================
BLOCK SCOPING WITH LET
====================*/

var foo = true;

if (foo) {
	let bar = foo * 2;
	bar = something( bar );
	console.log( bar );
}

console.log( bar ); // ReferenceError

/Using explicit block scoping

var foo = true;

if (foo) {
  { // <--- Explicit block
    let bar = foo * 2;
    bar = something(bar);
    console.log(bar);
  }
}

console.log(bar); // ReferenceError

/*=====================
GARBAGE COLLECTION
====================*/
function process(data) {
	// do something interesting
}

var someReallyBigData = { .. };

process( someReallyBigData );

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );



// Block scoping to address concerns
function process(data) {
	// do something interesting
}

// anything declared inside this block can go away after!
{
	let someReallyBigData = { .. };

	process( someReallyBigData );
}

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );


/*=====================
CHICKEN OR THE EGG?
====================*/

a = 2;

var a;

console.log( a );

//

console.log( a );

var a = 2;

/*=====================
COMPILER STRIKES AGAIN
====================*/

foo();

function foo() {
	console.log( a ); // undefined

	var a = 2;
}

//More accurately interpreted like this...
function foo() {
	var a;

	console.log( a ); // undefined

	a = 2;
}

foo();


/*=====================
SCOPE CLOSURES
====================*/

function foo() {
	var a = 2;

	function bar() {
		console.log( a ); // 2
	}

	bar();
}

foo();

////////

function foo() {
	var a = 2;

	function bar() {
		console.log( a );
	}

	return bar;
}

var baz = foo();

baz(); // 2 -- Whoa, closure was just observed, man.


///////
function foo() {
	var a = 2;

	function baz() {
		console.log( a ); // 2
	}

	bar( baz );
}

function bar(fn) {
	fn(); // look ma, I saw closure!
}

////The classic MakeAdder example:
function makeAdder(x) {
   return function(y) {
     return x + y;
   };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));
console.log(add10(2));

/*=====================
MODULES
====================*/

function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

/*=====================
MODERN MODULES
====================*/

var MyModules = (function Manager() {
	var modules = {};

	function define(name, deps, impl) {
		for (var i=0; i<deps.length; i++) {
			deps[i] = modules[deps[i]];
		}
		modules[name] = impl.apply( impl, deps );
	}

	function get(name) {
		return modules[name];
	}

	return {
		define: define,
		get: get
	};
})();

// The key part of this code is modules[name] = impl.apply(impl, deps). 
// This is invoking the definition wrapper function for a module (passing in any dependencies), and 
// storing the return value, the module's API, into an internal list of modules tracked by name.


MyModules.define( "bar", [], function(){
	function hello(who) {
		return "Let me introduce: " + who;
	}

	return {
		hello: hello
	};
} );

MyModules.define( "foo", ["bar"], function(bar){
	var hungry = "hippo";

	function awesome() {
		console.log( bar.hello( hungry ).toUpperCase() );
	}

	return {
		awesome: awesome
	};
} );

var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );

console.log(
	bar.hello( "hippo" )
); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO
