# Instructions

## Ex 1
Make a pure function `bar(..)` to wrap around `foo(..)`.

`function foo(x) {
	y++;
	z = x * y;
}

var y = 5, z;

foo(20);
z;		// 120

foo(25);
z;		// 175`

[Ex 1 Demo]
[Ex 1 Demo]:<https://rawgit.com/deepakanand/js-fp-practice/master/kyle-simpson-functional-js-lite-course/ex1.html>

## Ex 2 

Define `foo(..)` so that it produces a function which remembers only the first two arguments that were passed to `foo(..)`, and always adds them together.

`function foo() { /* .. */ }

var x = foo(3,4);

x();	// 7
x();	// 7`

[Ex 2 Demo]
[Ex 2 Demo]:<https://rawgit.com/deepakanand/js-fp-practice/master/kyle-simpson-functional-js-lite-course/ex2.html>


