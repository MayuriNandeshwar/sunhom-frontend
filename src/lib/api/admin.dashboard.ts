import api from "@/lib/axios";

export async function fetchRevenueAnalytics(days: number = 30) {
  const res = await api.get(
    `/api/admin/dashboard/analytics/revenue?days=${days}`
  );
  return res.data;
}

export async function fetchOrderStatusDistribution() {
  const res = await api.get(
    `/api/admin/dashboard/analytics/order-status`
  );
  return res.data;
}
