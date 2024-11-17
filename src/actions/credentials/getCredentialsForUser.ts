"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getCredentialsForUser() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("账号错误");
  }

  return prisma.credential.findMany({
    where: { userId },
    orderBy: {
      name: "asc",
    },
  });
}
