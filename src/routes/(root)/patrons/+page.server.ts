import { PrismaClient } from '@prisma/client';
import { invalid, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
	const patrons = await prisma.patron.findMany();
	console.log(patrons);
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const patron = await prisma.patron.create({
				data: formData
			});
			return { patron };
		} catch {
			// invalid credentials
			return invalid(400);
		}
	}
};
