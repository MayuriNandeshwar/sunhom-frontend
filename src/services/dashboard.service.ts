import api from "@/lib/axios";

export const getDashboardStats = async () => {
  const res = await api.get("/api/admin/dashboard");
  return res.data;
};
