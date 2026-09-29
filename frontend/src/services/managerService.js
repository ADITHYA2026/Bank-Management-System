import api from "../api/axios";
// Get Dashboard
export const getDashboard = async () => {
    const response = await api.get("/manager/dashboard");
    return response.data;
};
// Get All Customers
export const getManagerCustomers = async () => {
    const response = await api.get("/manager/customers");
    return response.data;
};
// Get All Transactions
export const getManagerTransactions = async (page = 0, size = 10) => {
    const response = await api.get(`/manager/transactions?page=${page}&size=${size}`);
    return response.data;
};
// Update Customer
export const updateCustomer = async (customerId, data) => {
    const response = await api.put(`/manager/customers/${customerId}`, data);
    return response.data;
};
// Update Transaction
export const updateTransaction = async (transactionId, data) => {
    const response = await api.put(`/manager/transactions/${transactionId}`, data);
    return response.data;
};