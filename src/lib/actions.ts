"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

export type FormState =
  | {
      errors?: any;
      message?: string;
      status?: string;
      data?: any;
    }
  | undefined;

export async function createBudgetItem(
  state: FormState,
  budget: { name: string; category: string; amount: string; note?: string }
) {
  console.log(budget);
  try {
    const response = await prisma.budgetItem.create({
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
  } catch (error: any) {
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
    const response = await prisma.budgetItem.update({
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
  } catch (error: any) {
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
    const response = await prisma.budget.create({
      data: {
        amount: parseFloat(budget.amount),
      },
    });
    console.log(response);
    return {
      status: "success",
    };
  } catch (error: any) {
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
  } catch (error: any) {
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
