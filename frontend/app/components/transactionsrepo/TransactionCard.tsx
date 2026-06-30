"use client";

import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface Props {
  transaction: any;
}

export default function TransactionCard({
  transaction,
}: Props) {
  const isCredit =
    transaction.transactionType === "credit";

  return (
    <div className="rounded-xl border p-5 bg-white shadow-sm">

      <div className="flex justify-between">

        <div className="flex gap-4">

          {isCredit ? (
            <ArrowDownCircle
              className="text-green-600"
              size={30}
            />
          ) : (
            <ArrowUpCircle
              className="text-red-500"
              size={30}
            />
          )}

          <div>

            <h3 className="font-semibold">
              {transaction.name}
            </h3>

            <p className="text-sm text-gray-500">
              {transaction.personalFinanceCategory}
            </p>

            <p className="text-xs text-gray-400">
              {new Date(
                transaction.date
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

        <h3
          className={`font-bold text-lg

          ${
            isCredit
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {isCredit ? "+" : "-"}$
          {transaction.amount}
        </h3>

      </div>

    </div>
  );
}