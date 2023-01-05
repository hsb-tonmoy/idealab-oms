export default function getPatron(filterText: string) {
	return new Promise((resolve, reject) => {
		fetch(`http://localhost:5173/patrons?search=${filterText}`)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				resolve(json.patrons);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
