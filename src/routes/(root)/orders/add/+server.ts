import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { prisma } from '$lib/server/prisma';

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

		// Loop through the files and delete the file if it has a delete flag, update if the file has an id, otherwise create a new file

		for (const file of fileData) {
			if (file.delete) {
				await prisma.file.delete({
					where: {
						id: file.id
					}
				});
				// Delete the file from array
				break;
			} else if (file.id) {
				if (file.delete) {
					delete file.delete;
				}
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
						orderId: id
					}
				});
			}
		}

		return json({ success: true });
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Order update failed');
}) satisfies RequestHandler;

export const DELETE = (async ({ request }) => {
	const requestData = await request.json();

	const { id } = requestData;

	try {
		const order = await prisma.order.delete({
			where: {
				id: id
			}
		});

		return json({ success: true });
	} catch (err) {
		console.log(err);
	}
	throw error(400, 'Order deletion failed');
}) satisfies RequestHandler;
