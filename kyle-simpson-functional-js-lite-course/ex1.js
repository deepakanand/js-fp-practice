// foo is an impure function
// Wrap it in a pure function - bar
function bar(x, y) {

	var z;
	foo();

	return [y, z];

	function foo() {
		y++;
		z = x * y;

	}

}

expect(
	bar(20, 5)
).toEqual([6, 120]);

// call bar second time and you get the same output
expect(
	bar(20, 5)
).toEqual([6, 120]);

expect(
	bar(25, 6)
).toEqual([7, 175]);

