"use server";

import { authOptions } from "@/providers/Auth";
import prisma from "@/lib/PrismaDb";
import { getServerSession } from "next-auth";

export async function getSession() {
	return await getServerSession(authOptions)
}

export async function getCurrentUser() {
	try {
		const session = await getSession();
		if (!session?.user?.email) {
			return null;
		}

		const CurrentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		});
		if (!CurrentUser) {
			return null;
		}
		return {
			...CurrentUser,
			createdAt: CurrentUser.createdAt.toISOString(),
			updatedAt: CurrentUser.updatedAt.toISOString(),
			emailVerified: CurrentUser.emailVerified?.toISOString() || null,
		};
	} catch (err: any) {
		return null;
	}
}