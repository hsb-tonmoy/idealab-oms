import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad, Actions } from './$types';

// If the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const name = form.get('name');
		const email = form.get('email');
		const password = form.get('password');

		// check for empty values
		if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
			return fail(400);
		}

		try {
			const user = await auth.createUser('email', email, {
				password,
				attributes: {
					name,
					email
				}
			});
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
			return { success: true };
		} catch {
			// email already in use
			return fail(400);
		}
	}
};
