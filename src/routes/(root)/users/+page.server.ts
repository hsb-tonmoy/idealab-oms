import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.validateUser();
	if (!user.isSuperAdmin) {
		throw redirect(302, '/');
	}
	const users = await prisma.user.findMany({
		orderBy: {
			name: 'asc'
		}
	});

	return {
		users
	};
};
