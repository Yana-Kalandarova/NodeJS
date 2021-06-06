import csvtojson from 'csvtojson';
import fs from 'fs';

const inputFile = './csv/task-2.csv';
const outputFile = './txt/task-2-stream.txt';
const readable = fs.createReadStream(inputFile, 'utf8');
const writable = fs.createWriteStream(outputFile, 'utf8');

csvtojson()
	.fromStream(readable)
	.subscribe(
		(jsonItem) => {
			writable.write(JSON.stringify(jsonItem).concat('\n'), 'utf8');
		},
		(error) => error && console.log(error),
		() => console.log('success')
	);
