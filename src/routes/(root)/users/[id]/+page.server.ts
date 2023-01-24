import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id;
	const user = await prisma.user.findUnique({
		where: {
			id: id
		}
	});

	return {
		user
	};
};
