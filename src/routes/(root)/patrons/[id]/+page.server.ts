import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;
	const patron = await prisma.patron.findUnique({
		where: {
			id: parseInt(id)
		}
	});

	return {
		patron
	};
};
