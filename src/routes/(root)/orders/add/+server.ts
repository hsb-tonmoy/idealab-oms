import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = (async ({ request }) => {
	const requestData = await request.json();

	try {
		const order = await prisma.order.create({
			data: requestData
		});
		if (order) {
			return json({ success: true });
		}
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Order failed');
}) satisfies RequestHandler;

export const PATCH = (async ({ request }) => {
	const requestData = await request.json();

	const { id } = requestData;

	const fileData = requestData.files;

	delete requestData.id;
	delete requestData.files;

	try {
		const order = await prisma.order.update({
			where: {
				id: id
			},
			data: requestData
		});

		// Loop through the files and update if the file has an id, otherwise create a new file

		console.log(fileData);

		for (const file of fileData) {
			if (file.id) {
				await prisma.file.update({
					where: {
						id: file.id
					},
					data: file
				});
			} else {
				await prisma.file.create({
					data: {
						...file,
						order: {
							connect: {
								id: id
							}
						}
					}
				});
			}
		}

		// Delete file if the file has a delete flag

		for (const file of fileData) {
			if (file.delete) {
				await prisma.file.delete({
					where: {
						id: file.id
					}
				});
			}
		}

		if (order) {
			return json({ success: true });
		}
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Order update failed');
}) satisfies RequestHandler;
