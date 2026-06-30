"use client";

import TransactionCard from "./TransactionCard";

interface Props {
  loading: boolean;
  transactions: any[];
}

export default function TransactionTable({
  loading,
  transactions,
}: Props) {
  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-10">
        No Transactions Found
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction._id}
          transaction={transaction}
        />
      ))}

    </div>
  );
}