import api from "../api/axios";
export const getEmployee = async (employeeId) => {
    const response = await api.get(
        `/employees/${employeeId}`
    );

    return response.data;
};