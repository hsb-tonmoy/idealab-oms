import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = (async ({ request }) => {
	const requestData = await request.json();

	try {
		const patron = await prisma.order.create({
			data: requestData
		});
		if (patron) {
			return json({ success: true });
		}
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Order failed');
}) satisfies RequestHandler;
