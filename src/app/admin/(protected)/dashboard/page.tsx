"use client";

import { useEffect, useState } from "react";
import RevenueLineChart from "@/components/admin/charts/RevenueLineChart";
import OrderStatusDonut from "@/components/admin/charts/OrderStatusDonut";
import {
  fetchRevenueAnalytics,
  fetchOrderStatusDistribution,
} from "@/lib/api/admin.dashboard";
import SunhomLoader from "@/components/common/SunhomLoader";

export default function AdminDashboardPage() {
  const [revenueData, setRevenueData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const [revenue, status] = await Promise.all([
          fetchRevenueAnalytics(30),
          fetchOrderStatusDistribution(),
        ]);

        setRevenueData(revenue);
        setStatusData(status);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <SunhomLoader variant="centered" text="Loading analytics…" glow />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <RevenueLineChart data={revenueData} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <OrderStatusDonut data={statusData} />
      </div>
    </div>
  );
}
