import * as rl from 'readline';

export function question(qn: string, callback: (answer: string) => void) {
	const r = rl.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	r.question(`${qn}\n> `, (answer) => {
		// Close the readline to prevent potentional memory leaks
		r.close();
		callback(answer);
	});
}
