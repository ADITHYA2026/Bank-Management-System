import api from "../api/axios";
export const deposit = async (data) => {
    const response = await api.post(
        "/transactions/deposit",
        data
    );
    return response.data;
};
export const withdraw = async (data) => {
    const response = await api.post(
        "/transactions/withdraw",
        data
    );
    return response.data;
};
export const transfer = async (data) => {
    const response = await api.post(
        "/transactions/transfer",
        data
    );
    return response.data;
};
export const getCustomerTransactions = async (
    customerId
) => {
    const response = await api.get(
        `/transactions/customer/${customerId}`
    );
    return response.data;
};