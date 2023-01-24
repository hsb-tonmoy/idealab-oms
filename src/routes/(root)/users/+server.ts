import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { prisma } from '$lib/server/prisma';

export const PATCH = (async ({ request }) => {
	const formData = await request.json();
	try {
		const user = await prisma.user.update({
			where: {
				email: formData.email
			},
			data: formData
		});
		if (user) {
			return json({ success: true });
		}
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Error updating user');
}) satisfies RequestHandler;
