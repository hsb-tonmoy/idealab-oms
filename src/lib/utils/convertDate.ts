export const convertDate = (string_date) => {
	let date_string = new Date(string_date);

	let date = date_string.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	let time = date_string.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	});
	return `${date} at ${time}`;
};
