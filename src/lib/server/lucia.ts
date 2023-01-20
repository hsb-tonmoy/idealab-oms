import lucia from 'lucia-auth';
import prisma from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (userData) => {
		return {
			userId: userData.id,
			email: userData.email,
			name: userData.name,
			position: userData.position,
			isAdmin: userData.isAdmin,
			isSuperAdmin: userData.isSuperAdmin
		};
	}
});

export type Auth = typeof auth;
