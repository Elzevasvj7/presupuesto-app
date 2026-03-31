import crypto from "crypto";

type BinanceAccountBalance = {
  asset: string;
  free: string;
  locked: string;
};

type BinanceAccountResponse = {
  balances: BinanceAccountBalance[];
};

export type BinanceAssetSummary = {
  asset: string;
  amount: number;
  usdValue: number;
};

export type BinanceBalanceSummary = {
  totalUsd: number;
  assetsCount: number;
  assets: BinanceAssetSummary[];
};

function signQuery(query: string, apiSecret: string): string {
  return crypto.createHmac("sha256", apiSecret).update(query).digest("hex");
}

async function fetchJson<T>(url: string, apiKey?: string): Promise<T> {
  const res = await fetch(url, {
    headers: apiKey ? { "X-MBX-APIKEY": apiKey } : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Binance API error: ${res.status} ${body}`);
  }

  return res.json() as Promise<T>;
}

export async function getBinanceAccount(
  apiKey: string,
  apiSecret: string,
): Promise<BinanceAccountResponse> {
  const query = new URLSearchParams({
    timestamp: String(Date.now()),
    recvWindow: "5000",
  }).toString();

  const signature = signQuery(query, apiSecret);
  const url = `https://api.binance.com/api/v3/account?${query}&signature=${signature}`;

  return fetchJson<BinanceAccountResponse>(url, apiKey);
}

async function getPriceMap(): Promise<Map<string, number>> {
  const prices = await fetchJson<Array<{ symbol: string; price: string }>>(
    "https://api.binance.com/api/v3/ticker/price",
  );

  const priceMap = new Map<string, number>();
  prices.forEach((entry) => {
    const parsed = parseFloat(entry.price);
    if (!Number.isNaN(parsed)) {
      priceMap.set(entry.symbol, parsed);
    }
  });

  return priceMap;
}

function assetToUsd(asset: string, amount: number, priceMap: Map<string, number>): number {
  if (amount <= 0) return 0;

  if (asset === "USDT" || asset === "USDC" || asset === "BUSD") {
    return amount;
  }

  const direct = priceMap.get(`${asset}USDT`);
  if (direct) {
    return amount * direct;
  }

  const inverse = priceMap.get(`USDT${asset}`);
  if (inverse && inverse > 0) {
    return amount / inverse;
  }

  return 0;
}

export async function getBinanceSpotBalanceSummary(
  apiKey: string,
  apiSecret: string,
): Promise<BinanceBalanceSummary> {
  const [account, priceMap] = await Promise.all([
    getBinanceAccount(apiKey, apiSecret),
    getPriceMap(),
  ]);

  const assets: BinanceAssetSummary[] = account.balances
    .map((balance) => {
      const amount = parseFloat(balance.free) + parseFloat(balance.locked);
      const usdValue = assetToUsd(balance.asset, amount, priceMap);
      return {
        asset: balance.asset,
        amount,
        usdValue,
      };
    })
    .filter((asset) => asset.amount > 0)
    .sort((a, b) => b.usdValue - a.usdValue);

  const totalUsd = assets.reduce((acc, asset) => acc + asset.usdValue, 0);

  return {
    totalUsd,
    assetsCount: assets.length,
    assets: assets.slice(0, 8),
  };
}
