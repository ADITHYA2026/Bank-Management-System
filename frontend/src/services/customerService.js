import api from "../api/axios";
export const getCustomer = async (customerId) => {
    const response = await api.get(
        `/customers/${customerId}`
    );
    return response.data;
};
export const getCustomerByAccountNumber = async ( accountNumber ) => {
    const response = await api.get(
        `/customers/account/${accountNumber}`
    );
    return response.data;
};