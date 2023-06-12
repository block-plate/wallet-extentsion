import axios from 'axios';

// axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: `http://block.platechain.shop/v1/`,
});

export const getBlocks = () => api.get(`/block`)

export const login = (data: any) => api.post(`/auth/login`, data);

export const getWallets = () => api.get(`/wallet/`);

export const getWallet = (account: any) => api.get(`/wallet/${account}`);

export const sendTransaction = (data: any) => api.post('/transaction', data);