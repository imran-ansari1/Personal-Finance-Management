"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const filters = [
  "all",
  "credit",
  "debit",
  "pending",
];

export default function TransactionFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex gap-3 flex-wrap">

      {filters.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`px-5 py-2 rounded-lg border transition

          ${
            value === item
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {item}
        </button>
      ))}

    </div>
  );
}