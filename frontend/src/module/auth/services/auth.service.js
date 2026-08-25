//Autor: Greivin Eliecer A.G

import api from '../../../api/api';

export const loginService = async (identificador, password) => {
    return await api.post('/auth/login', { identificador, password });
};

export const recoverPasswordService = async (identificador) => {
    return await api.post('/auth/recover-password', { identificador });
};

export const requestRecoveryCodeService = async (identificador) => {
    return await api.post('/auth/recover-password', { identificador });
};

export const resetPasswordService = async (token, newPassword, confirmNewPassword) => {
    return await api.post('/auth/reset-password', { token, newPassword, confirmNewPassword });
};

export const logoutService = async () => {
    return await api.post('/auth/logout');
};