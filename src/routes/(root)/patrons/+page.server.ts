import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const patrons = await prisma.patron.findMany({
		orderBy: {
			firstName: 'asc'
		}
	});

	return {
		patrons
	};
};
