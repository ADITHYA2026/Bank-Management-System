import api from "../api/axios";
export const getAnalytics = async (data) => {
  const response = await api.post("/manager/analytics", data);
  return response.data;
};