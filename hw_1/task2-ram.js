import csvtojson from 'csvtojson';
import fs from 'fs';

const inputFile = './csv/task-2.csv';
const outputFile = './txt/task-2-ram.txt';

fs.readFile(inputFile, 'utf-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}

	csvtojson()
		.fromString(data)
		.then((jsonObj) => JSON.stringify(jsonObj).concat('\n'))
		.then((data) => {
			fs.writeFile(
				outputFile,
				data,
				'utf-8',
				(error) => {
					if (error) {
						console.error(error);
						return;
					}

					console.log('success');
				}
			);
		});
});
