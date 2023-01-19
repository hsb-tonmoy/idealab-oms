import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const orders = await prisma.order.findMany({
		include: {
			user: true,
			patron: true
		},
		where: {
			deleted: false
		},
		orderBy: {
			dateOrdered: 'desc'
		}
	});

	return {
		orders
	};
};
