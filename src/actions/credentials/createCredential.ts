"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { symmetricEncrypt } from "@/lib/encryption";
import {
  createCredentialSchema,
  createCredentialSchemaType,
} from "@/schema/credentials";

export async function createCredential(form: createCredentialSchemaType) {
  const { success, data } = createCredentialSchema.safeParse(form);

  if (!success) {
    throw new Error("数据错误");
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("账号错误");
  }

  const encryptedValue = symmetricEncrypt(data.value);

  const result = await prisma.credential.create({
    data: {
      userId,
      name: data.name,
      value: encryptedValue,
    },
  });

  if (!result) {
    throw new Error("创建凭证错误");
  }

  revalidatePath("/credentials");
}
