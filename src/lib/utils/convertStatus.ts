export function convertStatus(status: string, small = false) {
	let sizeClass = small ? 'text-xs' : 'text-sm';
	switch (status) {
		case 'new':
			return `<span
                  class="${sizeClass} px-2 py-1 leading-tight text-white bg-gray-400 rounded-full dark:bg-gray-600"
                >
                  New
                </span>`;
		case 'in-progress':
			return `<span
                  class="${sizeClass} px-2 py-1 leading-tight text-white bg-orange-400 rounded-full dark:bg-amber-600"
                >
                  In-progress
                </span>`;
		case 'complete':
			return `<span
                  class="${sizeClass} px-2 py-1 leading-tight text-white bg-green-500 rounded-full dark:bg-green-700"
                >
                  Complete
                </span>`;
		default:
			return 'New';
	}
}
