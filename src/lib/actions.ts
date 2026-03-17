"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { createClient } from "./supabase/server";

export type FormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      status?: string;
      data?: Record<string, unknown>;
    }
  | undefined;

async function getUserId(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");
  return user.id;
}

export async function createBudgetItem(
  state: FormState,
  budget: { name: string; category: string; amount: string; note?: string },
) {
  try {
    const userId = await getUserId();
    await prisma.budgetItem.create({
      data: {
        name: budget.name,
        category: budget.category,
        amount: parseFloat(budget.amount),
        note: budget.note,
        userId,
      },
    });
    return {
      status: "success",
    };
  } catch {
    return {
      status: "error",
    };
  } finally {
    revalidatePath("/");
  }
}
export async function updateBudgetItem(
  state: FormState,
  budget: {
    id: number;
    name: string;
    category: string;
    amount: string;
    note?: string;
  },
) {
  try {
    const userId = await getUserId();
    await prisma.budgetItem.update({
      where: {
        id: budget.id,
        userId,
      },
      data: {
        name: budget.name,
        category: budget.category,
        amount: parseFloat(budget.amount),
        note: budget.note,
      },
    });
    return {
      status: "success",
    };
  } catch {
    return {
      status: "error",
    };
  } finally {
    revalidatePath("/");
  }
}
export async function deleteBudgetItem(id: number) {
  const userId = await getUserId();
  await prisma.budgetItem.delete({
    where: {
      id,
      userId,
    },
  });
  revalidatePath("/");
}
export async function getBudgetItems() {
  const userId = await getUserId();
  const response = await prisma.budgetItem.findMany({
    where: { userId },
  });
  console.log(response)
  return response;
}
export async function createBudget(
  state: FormState,
  budget: { amount: string },
) {
  try {
    const userId = await getUserId();
    // Upsert: crear o actualizar el presupuesto del usuario
    await prisma.budget.upsert({
      where: { userId },
      update: { amount: parseFloat(budget.amount) },
      create: {
        amount: parseFloat(budget.amount),
        userId,
      },
    });
    return {
      status: "success",
    };
  } catch {
    return {
      status: "error",
    };
  } finally {
    revalidatePath("/");
  }
}
export async function updateBudget(
  state: FormState,
  budget: { id: number; amount: string },
) {
  try {
    const userId = await getUserId();
    await prisma.budget.update({
      where: {
        id: budget.id,
        userId,
      },
      data: {
        amount: parseFloat(budget.amount),
      },
    });
    return {
      status: "success",
    };
  } catch {
    return {
      status: "error",
    };
  } finally {
    revalidatePath("/");
  }
}
export async function getBudget() {
  const userId = await getUserId();
  const response = await prisma.budget.findUnique({
    where: { userId },
  });
  return response;
}

// Transaction actions
export async function createTransaction(
  state: FormState,
  transaction: {
    description: string;
    amount: string;
    type: string;
    category: string;
    date: string;
  },
) {
  try {
    const userId = await getUserId();
    await prisma.transaction.create({
      data: {
        description: transaction.description,
        amount: parseFloat(transaction.amount),
        type: transaction.type,
        category: transaction.category,
        date: new Date(transaction.date),
        userId,
      },
    });
    return {
      status: "success",
    };
  } catch {
    return {
      status: "error",
    };
  } finally {
    revalidatePath("/");
  }
}

export async function getTransactions() {
  const userId = await getUserId();
  const response = await prisma.transaction.findMany({
    where: { userId },
    orderBy: {
      date: "desc",
    },
  });
  return response;
}

export async function deleteTransaction(id: number) {
  const userId = await getUserId();
  await prisma.transaction.delete({
    where: {
      id,
      userId,
    },
  });
  revalidatePath("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}
