// src/api/api.ts
import axios from 'axios';

// Postavite osnovni URL vašeg FastAPI backend servera
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// TODO: Implementirati metode za komunikaciju s backendom

export const fetchAgents = async () => {
    // return await api.get('/agents');
};

export const createAgent = async (agentData: any) => {
    // return await api.post('/agents', agentData);
};

export const updateAgent = async (agentId: string, agentData: any) => {
    // return await api.put(`/agents/${agentId}`, agentData);
};

export const deleteAgent = async (agentId: string) => {
    // return await api.delete(`/agents/${agentId}`);
};

export const uploadDocument = async (agentId: string, document: File) => {
    // const formData = new FormData();
    // formData.append('document', document);
    // return await api.post(`/agents/${agentId}/documents`, formData);
};

export const logoutUser = async () => {
    // return await api.post('/logout');
};
