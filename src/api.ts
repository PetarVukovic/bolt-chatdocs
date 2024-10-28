// src/api/api.ts
import axios from 'axios';

// Postavite osnovni URL vašeg FastAPI backend servera
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Zakomentirane API metode

// export const _apiLogin = async (email: string, password: string) => {
//   return await api.post('/login', { email, password });
// };

// export const _apiRegister = async (email: string, password: string) => {
//   return await api.post('/register', { email, password });
// };

// export const _apiCreateAgent = async (agentData: any) => {
//   return await api.post('/agents', agentData);
// };

// export const _apiUpdateAgent = async (agentId: string, agentData: any) => {
//   return await api.put(`/agents/${agentId}`, agentData);
// };

// export const _apiDeleteAgent = async (agentId: string) => {
//   return await api.delete(`/agents/${agentId}`);
// };

// export const _apiUploadDocuments = async (agentId: string, documents: File[]) => {
//   const formData = new FormData();
//   documents.forEach((doc) => formData.append('documents', doc));
//   return await api.post(`/agents/${agentId}/documents`, formData);
// };

// export const _apiSendMessage = async (agentId: string, message: string) => {
//   return await api.post(`/agents/${agentId}/messages`, { message });
// };

// export const _apiLogout = async () => {
//   return await api.post('/logout');
// };
