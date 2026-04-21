"use client"
import React from 'react';

type OrderStatus = "paid" | "delivered" | "return" | "completed" | "cancelled" | string;

interface StatusBadgeProps {
  status: OrderStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  // Define color mapping for each status
  const statusConfig: Record<string, string> = {
    paid: "bg-blue-50 text-blue-700 border-blue-200",
    delivered: "bg-purple-50 text-purple-700 border-purple-200",
    return: "bg-orange-50 text-orange-700 border-orange-200",
    completed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  // Fallback style for unknown statuses
  const currentStyle = statusConfig[status.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200";

  // Helper to make status look nice (e.g., "paid" -> "Paid")
  const formatStatus = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-0.5 text-xs leading-body font-medium title-font2 transition-colors ${currentStyle}`}
    >
      {formatStatus(status)}
    </span>
  );
};