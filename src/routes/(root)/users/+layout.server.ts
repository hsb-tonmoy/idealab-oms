import type { LayoutServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user, session } = await locals.validateUser();
	if (session && !user.isSuperAdmin) {
		throw redirect(302, '/');
	}
};
