"use client";

import { connectBinance, disconnectBinance, FormState } from "@/lib/actions";
import React, { useActionState } from "react";

type BinanceSummary =
  | {
      connected: false;
    }
  | {
      connected: true;
      totalUsd: number;
      assetsCount: number;
      assets: Array<{
        asset: string;
        amount: number;
        usdValue: number;
      }>;
    };

export const BinanceConnectionForm = ({
  summary,
}: {
  summary: BinanceSummary;
}) => {
  const [connectState, connectAction, connectPending] = useActionState<
    FormState,
    FormData
  >(connectBinance, undefined);

  const [disconnectState, disconnectAction, disconnectPending] =
    useActionState<FormState, FormData>(disconnectBinance, undefined);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xl text-gray-800">Binance</h3>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            summary.connected
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {summary.connected ? "Conectado" : "Sin conectar"}
        </span>
      </div>

      {summary.connected ? (
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <p className="text-sm text-gray-500">Saldo estimado Spot (USD)</p>
            <p className="text-2xl font-bold text-gray-900">
              ${summary.totalUsd.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              Activos con saldo: {summary.assetsCount}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-3 max-h-48 overflow-auto">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Principales activos
            </p>
            {summary.assets.length === 0 ? (
              <p className="text-sm text-gray-500">No hay activos para mostrar.</p>
            ) : (
              <div className="space-y-2">
                {summary.assets.map((asset) => (
                  <div
                    key={asset.asset}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium text-gray-800">{asset.asset}</span>
                    <span className="text-gray-600">
                      {asset.amount.toFixed(6)} (${asset.usdValue.toFixed(2)})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form action={disconnectAction}>
            <button
              type="submit"
              disabled={disconnectPending}
              className="w-full bg-red-500 text-white py-2.5 px-4 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 font-semibold"
            >
              {disconnectPending ? "Desconectando..." : "Desconectar Binance"}
            </button>
          </form>

          {disconnectState?.message && (
            <p
              className={`text-sm text-center ${
                disconnectState.status === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {disconnectState.message}
            </p>
          )}
        </div>
      ) : (
        <form action={connectAction} className="space-y-3">
          <p className="text-sm text-gray-600">
            Conecta tu cuenta con una API Key de solo lectura para mostrar saldo.
          </p>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">API Key</span>
            <input
              required
              name="apiKey"
              type="text"
              className="rounded-lg text-black p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Pega tu API Key"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">API Secret</span>
            <input
              required
              name="apiSecret"
              type="password"
              className="rounded-lg text-black p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Pega tu API Secret"
            />
          </label>

          <button
            type="submit"
            disabled={connectPending}
            className="w-full bg-[#834CFC] text-white py-2.5 px-4 rounded-lg hover:bg-[#6d3dd4] transition-colors disabled:opacity-50 font-semibold"
          >
            {connectPending ? "Conectando..." : "Conectar Binance"}
          </button>

          {connectState?.message && (
            <p
              className={`text-sm text-center ${
                connectState.status === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {connectState.message}
            </p>
          )}
        </form>
      )}
    </div>
  );
};
