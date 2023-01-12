import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';

const prisma = new PrismaClient();

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
