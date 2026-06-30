"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import SearchBar from "../../components/transactionsrepo/SearchBar";
import TransactionFilter from "../../components/transactionsrepo/TransactionFilter";
import TransactionTable from "../../components/transactionsrepo/TransactionTable";

export interface Transaction {
  _id: string;
  transactionId: string;
  name: string;
  merchantName: string;
  amount: number;
  currency: string;
  transactionType: "credit" | "debit";
  personalFinanceCategory: string;
  paymentChannel: string;
  pending: boolean;
  date: string;
}

export interface Summary {
  totalTransactions: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  pendingTransactions: number;
  completedTransactions: number;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8000/api/sync-transactions",
        {
          withCredentials: true,
        }
      );

      setTransactions(res.data.transactions);
      setSummary(res.data.summary);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.name.toLowerCase().includes(search.toLowerCase()) ||
        tx.merchantName?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "pending"
          ? tx.pending
          : tx.transactionType === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  return (
    <div className="space-y-8 p-8">

      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold">
          Transactions
        </h1>

        <p className="text-gray-500">
          View and manage all your financial transactions.
        </p>
      </div>

      {/* Summary */}

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <Card
            title="Balance"
            value={`$${summary.balance.toFixed(2)}`}
          />

          <Card
            title="Income"
            value={`$${summary.totalIncome.toFixed(2)}`}
          />

          <Card
            title="Expense"
            value={`$${summary.totalExpense.toFixed(2)}`}
          />

          <Card
            title="Transactions"
            value={summary.totalTransactions.toString()}
          />

        </div>
      )}

      {/* Search */}

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {/* Filter */}

      <TransactionFilter
        value={filter}
        onChange={setFilter}
      />

      {/* Table */}

      <TransactionTable
        loading={loading}
        transactions={filteredTransactions}
      />

    </div>
  );
}

interface CardProps {
  title: string;
  value: string;
}

function Card({ title, value }: CardProps) {
  return (
    <div className="rounded-xl border bg-gray-300 p-6 shadow-sm">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {value}
      </h2>

    </div>
  );
}