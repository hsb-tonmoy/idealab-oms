import lucia from 'lucia-auth';
import prisma from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: dev ? 'DEV' : 'PROD'
});

export type Auth = typeof auth;
