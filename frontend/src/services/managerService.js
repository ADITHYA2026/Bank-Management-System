import api from "../api/axios";
export const getDashboard = async () => {
    const response = await api.get(
        "/manager/dashboard"
    );
    return response.data;
};
export const getManagerCustomers = async () => {
    const response = await api.get(
        "/manager/customers"
    );
    return response.data;
};
export const getManagerTransactions = async () => {
    const response = await api.get(
        "/manager/transactions"
    );
    return response.data;
};
export const updateCustomer = async (
    customerId,
    data
) => {
    const response = await api.put(
        `/manager/customers/${customerId}`,
        data
    );
    return response.data;
};