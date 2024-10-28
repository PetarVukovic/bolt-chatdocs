export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  documents: Document[];
  customPrompt: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'excel';
  url: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  agentId: string;
}