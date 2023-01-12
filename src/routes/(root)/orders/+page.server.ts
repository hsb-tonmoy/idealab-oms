import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
	const orders = await prisma.order.findMany({
		include: {
			user: true,
			patron: true
		}
	});

	return {
		orders
	};
};
