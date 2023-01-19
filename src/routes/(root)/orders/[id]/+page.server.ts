import { prisma } from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;
	const order = await prisma.order.findUnique({
		where: {
			id: parseInt(id)
		},
		include: {
			user: true,
			patron: true,
			files: true
		}
	});

	return {
		order
	};
};
