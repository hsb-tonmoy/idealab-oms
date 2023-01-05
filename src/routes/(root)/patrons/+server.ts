import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async ({ url }) => {
	const search = url.searchParams?.get('search');

	const patrons = await prisma.patron.findMany({
		where: {
			OR: [
				{
					firstName: {
						contains: search,
						mode: 'insensitive'
					}
				},
				{
					lastName: {
						contains: search,
						mode: 'insensitive'
					}
				},
				{
					email: {
						contains: search,
						mode: 'insensitive'
					}
				}
			]
		}
	});

	return new Response(JSON.stringify({ patrons }));
};

export const POST = (async ({ request }) => {
	const formData = await request.json();
	try {
		const patron = await prisma.patron.create({
			data: formData
		});
		if (patron) {
			return json({ success: true });
		}
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Patron already exists');
}) satisfies RequestHandler;
