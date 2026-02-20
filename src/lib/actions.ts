"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export type FormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      status?: string;
      data?: Record<string, unknown>;
    }
  | undefined;

export async function createBudgetItem(
  state: FormState,
  budget: { name: string; category: string; amount: string; note?: string }
) {
  console.log(budget);
  try {
    await prisma.budgetItem.create({
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
export async function updateBudgetItem(
  state: FormState,
  budget: {
    id: number;
    name: string;
    category: string;
    amount: string;
    note?: string;
  }
) {
  try {
    await prisma.budgetItem.update({
      where: {
        id: budget.id,
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
  await prisma.budgetItem.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}
export async function getBudgetItems() {
  const response = await prisma.budgetItem.findMany();
  return response;
}
export async function createBudget(
  state: FormState,
  budget: { amount: string }
) {
  try {
    await prisma.budget.create({
      data: {
        amount: parseFloat(budget.amount),
      },
    });
    console.log("Budget created");
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
  budget: { id: number; amount: string }
) {
  try {
    await prisma.budget.update({
      where: {
        id: budget.id,
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
  const response = await prisma.budget.findFirst();
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
  }
) {
  try {
    await prisma.transaction.create({
      data: {
        description: transaction.description,
        amount: parseFloat(transaction.amount),
        type: transaction.type,
        category: transaction.category,
        date: new Date(transaction.date),
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
  const response = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
  });
  return response;
}

export async function deleteTransaction(id: number) {
  await prisma.transaction.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
}

