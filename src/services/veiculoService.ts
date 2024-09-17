import axios from 'axios';

const API_URL = 'http://localhost:3000/veiculos';

export const getVeiculos = () => axios.get(API_URL);
export const getVeiculo = (id: string) => axios.get(`${API_URL}/${id}`);
export const createVeiculo = (data: any) => axios.post(API_URL, data);
export const updateVeiculo = (id: string, data: any) => axios.patch(`${API_URL}/${id}`, data);
export const deleteVeiculo = (id: string) => axios.delete(`${API_URL}/${id}`);
