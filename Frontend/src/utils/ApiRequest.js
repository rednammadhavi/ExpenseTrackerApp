const host = "http://localhost:5000";

export const registerAPI = `${host}/api/auth/register`;
export const loginAPI = `${host}/api/auth/login`;
export const forgetPasswordAPI = `${host}/api/auth/forgotPassword`;
export const setAvatarAPI = `${host}/api/auth/setAvatar`;
export const addTransaction = `${host}/api/v1/addTransaction`;
export const getTransactions = `${host}/api/v1/getTransaction`;
export const editTransactions = `${host}/api/v1/updateTransaction`;
export const deleteTransactions = `${host}/api/v1/deleteTransaction`;
