import { invalid, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad, Actions } from './$types';
import { goto, invalidate, invalidateAll } from '$app/navigation';

// If the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (session) throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');
		// check for empty values
		if (!email || !password || typeof email !== 'string' || typeof password !== 'string')
			return invalid(400);
		try {
			const user = await auth.authenticateUser('email', email, password);
			const session = await auth.createSession(user.userId);
			locals.setSession(session);

			return { success: true };
		} catch {
			// invalid credentials
			return invalid(400);
		}
	}
};
