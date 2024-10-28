// src/store/useStore.ts
import { create } from 'zustand';
import { User, Agent, Message } from '../types';

interface Store {
  user: User | null;
  agents: Agent[];
  messages: Message[];
  currentAgent: Agent | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  addAgent: (agent: Agent) => void;
  updateAgent: (agent: Agent) => void;
  deleteAgent: (agentId: string) => void;
  setCurrentAgent: (agent: Agent | null) => void;
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

const dummyAgent: Agent = {
  id: '1',
  name: 'Document Analysis Agent',
  description: 'This agent helps analyze documents and answer questions',
  documents: [
    { id: '1', name: 'sample.pdf', type: 'pdf', url: '#' },
    { id: '2', name: 'data.xlsx', type: 'excel', url: '#' },
  ],
  customPrompt: 'You are a helpful assistant that analyzes documents.',
};

const dummyMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I help you analyze your documents?',
    role: 'assistant',
    timestamp: new Date(),
    agentId: '1',
  },
];

const useStore = create<Store>((set) => ({
  user: { id: '1', email: 'user@example.com', name: 'John Doe' },
  agents: [dummyAgent],
  messages: dummyMessages,
  currentAgent: dummyAgent,
  isLoading: false,
  setUser: (user) => set({ user }),
  addAgent: (agent) =>
    set((state) => ({ agents: [...state.agents, agent] })),
  updateAgent: (updatedAgent) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === updatedAgent.id ? updatedAgent : agent
      ),
    })),
  deleteAgent: (agentId) =>
    set((state) => ({
      agents: state.agents.filter((agent) => agent.id !== agentId),
      currentAgent:
        state.currentAgent?.id === agentId ? null : state.currentAgent,
    })),
  setCurrentAgent: (agent) => set({ currentAgent: agent }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () =>
    set({
      user: null,
      agents: [],
      messages: [],
      currentAgent: null,
    }),
}));

export default useStore;
