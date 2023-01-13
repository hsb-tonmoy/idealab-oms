export const convertDate = (string_date: string, dateOnly = false, timeOnly = false) => {
	let date_string = new Date(string_date);

	let date = date_string.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	let time = date_string.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	});

	if (dateOnly) {
		return date;
	} else if (timeOnly) {
		return time;
	}

	return `${date} at ${time}`;
};
