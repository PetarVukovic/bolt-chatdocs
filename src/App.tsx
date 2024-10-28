// src/App.tsx
import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Auth from './components/Auth';
import useStore from './store/useStore';

const App: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <ChakraProvider>
      <Router>
        {!user ? (
          <Auth />
        ) : (
          <Flex h="100vh" bg="gray.100">
            <Sidebar />
            <ChatInterface />
          </Flex>
        )}
      </Router>
    </ChakraProvider>
  );
};

export default App;
