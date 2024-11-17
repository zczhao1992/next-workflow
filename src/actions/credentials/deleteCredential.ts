"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function deleteCredential(name: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("账户错误");
  }

  await prisma.credential.delete({
    where: {
      userId_name: {
        userId,
        name,
      },
    },
  });

  revalidatePath("/credentials");
}
