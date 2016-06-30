function mult(...args) {
	if (args.length <= 2){
		return args[0] * args[1];
	}

	return (args[0] *
		mult(...args.slice(1))
		);
}

expect(
	mult(3,4,5)
).toEqual(60);

expect(
	mult(3,4,5,6)	
).toEqual(360);