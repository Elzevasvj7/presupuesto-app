"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { createClient } from "./supabase/server";
import { decryptText, encryptText } from "./crypto";
import {
  BinanceBalanceSummary,
  getBinanceSpotBalanceSummary,
} from "./binance";

export type FormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      status?: string;
      data?: Record<string, unknown>;
    }
  | undefined;

export type DashboardOverviewData = {
  budget: { id: number; amount: number } | null;
  budgets: Array<{
    id: number;
    name: string;
    category: string;
    amount: number;
    note: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  transactions: Array<{
    id: number;
    description: string;
    amount: number;
    type: string;
    balanceType: string;
    category: string;
    date: Date;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  metrics: {
    currentBalance: number;
    cashBalance: number;
    digitalBalance: number;
    monthIncome: number;
    monthExpenses: number;
    monthNet: number;
    plannedBudgetTotal: number;
    plannedAllocationTotal: number;
    realVsPlan: number;
  };
};

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
    balanceType: string;
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
        balanceType: transaction.balanceType,
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

export async function getDashboardOverview(): Promise<DashboardOverviewData> {
  const userId = await getUserId();

  const [budget, budgets, transactions] = await Promise.all([
    prisma.budget.findUnique({
      where: { userId },
    }),
    prisma.budgetItem.findMany({
      where: { userId },
      orderBy: [{ category: "asc" }, { createdAt: "asc" }],
    }),
    prisma.transaction.findMany({
      where: { userId },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const currentBalance = transactions.reduce((total, transaction) => {
    return total + (transaction.type === "income" ? transaction.amount : -transaction.amount);
  }, 0);

  const cashBalance = transactions.reduce((total, transaction) => {
    if (transaction.balanceType !== "cash") {
      return total;
    }

    return total + (transaction.type === "income" ? transaction.amount : -transaction.amount);
  }, 0);

  const digitalBalance = transactions.reduce((total, transaction) => {
    if (transaction.balanceType !== "digital") {
      return total;
    }

    return total + (transaction.type === "income" ? transaction.amount : -transaction.amount);
  }, 0);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });

  const monthIncome = monthTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const monthExpenses = monthTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const plannedBudgetTotal = budget?.amount || 0;
  const plannedAllocationTotal = budgets.reduce(
    (total, item) => total + item.amount,
    0,
  );

  return {
    budget,
    budgets,
    transactions,
    metrics: {
      currentBalance,
      cashBalance,
      digitalBalance,
      monthIncome,
      monthExpenses,
      monthNet: monthIncome - monthExpenses,
      plannedBudgetTotal,
      plannedAllocationTotal,
      realVsPlan: monthExpenses - plannedAllocationTotal,
    },
  };
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

export async function connectBinance(
  _state: FormState,
  formData: FormData,
) {
  try {
    const userId = await getUserId();

    const apiKey = String(formData.get("apiKey") || "").trim();
    const apiSecret = String(formData.get("apiSecret") || "").trim();

    if (!apiKey || !apiSecret) {
      return {
        status: "error",
        message: "API Key y API Secret son obligatorios",
      };
    }

    // Validate credentials before saving.
    await getBinanceSpotBalanceSummary(apiKey, apiSecret);

    const encryptedApiKey = encryptText(apiKey);
    const encryptedApiSecret = encryptText(apiSecret);

    await prisma.binanceCredential.upsert({
      where: { userId },
      update: {
        apiKeyEncrypted: encryptedApiKey.encrypted,
        apiKeyIv: encryptedApiKey.iv,
        apiKeyAuthTag: encryptedApiKey.authTag,
        apiSecretEncrypted: encryptedApiSecret.encrypted,
        apiSecretIv: encryptedApiSecret.iv,
        apiSecretAuthTag: encryptedApiSecret.authTag,
      },
      create: {
        userId,
        apiKeyEncrypted: encryptedApiKey.encrypted,
        apiKeyIv: encryptedApiKey.iv,
        apiKeyAuthTag: encryptedApiKey.authTag,
        apiSecretEncrypted: encryptedApiSecret.encrypted,
        apiSecretIv: encryptedApiSecret.iv,
        apiSecretAuthTag: encryptedApiSecret.authTag,
      },
    });

    return {
      status: "success",
      message: "Cuenta Binance conectada",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo conectar Binance";

    return {
      status: "error",
      message,
    };
  } finally {
    revalidatePath("/");
  }
}

export async function disconnectBinance(_state: FormState, _formData: FormData) {
  try {
    void _state;
    void _formData;
    const userId = await getUserId();
    await prisma.binanceCredential.deleteMany({
      where: { userId },
    });

    return {
      status: "success",
      message: "Cuenta Binance desconectada",
    };
  } catch {
    return {
      status: "error",
      message: "No se pudo desconectar Binance",
    };
  } finally {
    revalidatePath("/");
  }
}

export async function getBinanceBalanceSummary(): Promise<
  (BinanceBalanceSummary & { connected: true }) | { connected: false }
> {
  const userId = await getUserId();

  const credential = await prisma.binanceCredential.findUnique({
    where: { userId },
  });

  if (!credential) {
    return { connected: false };
  }

  try {
    const apiKey = decryptText({
      encrypted: credential.apiKeyEncrypted,
      iv: credential.apiKeyIv,
      authTag: credential.apiKeyAuthTag,
    });

    const apiSecret = decryptText({
      encrypted: credential.apiSecretEncrypted,
      iv: credential.apiSecretIv,
      authTag: credential.apiSecretAuthTag,
    });

    const summary = await getBinanceSpotBalanceSummary(apiKey, apiSecret);

    await prisma.binanceBalanceSnapshot.create({
      data: {
        userId,
        totalUsd: summary.totalUsd,
        assetsCount: summary.assetsCount,
        balancesJson: JSON.stringify(summary.assets),
      },
    });

    return {
      connected: true,
      ...summary,
    };
  } catch {
    // If credentials are invalid/revoked, keep connected=true to allow explicit replacement.
    return {
      connected: true,
      totalUsd: 0,
      assetsCount: 0,
      assets: [],
    };
  }
}
