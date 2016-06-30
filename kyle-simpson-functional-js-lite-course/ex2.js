function foo(a, b) { 
	return function(){
		return a + b;
	}

 }

var x = foo(3,4);

expect(
	x()
).toEqual(7);

expect(
	x()
).toEqual(7);