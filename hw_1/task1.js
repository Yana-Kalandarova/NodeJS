const reverseStr = () => {
	process.stdin.setEncoding('utf8');

	process.stdin.on('readable', () => {
		const chunk = process.stdin.read();
		const reversedStr = chunk.split('').reverse().join('');

		if (chunk !== null) {
			process.stdout.write(`${reversedStr}\n`);
		}
	});
};

reverseStr();
