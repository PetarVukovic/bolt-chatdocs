// src/components/ChatInterface.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  Icon,
  Spinner,
  SlideFade,
  Heading,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import useStore from '../store/useStore';
// Importirajte zakomentiranu API metodu
// import { _apiSendMessage } from '../api/api';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const messages = useStore((state) => state.messages);
  const currentAgent = useStore((state) => state.currentAgent);
  const isLoading = useStore((state) => state.isLoading);
  const addMessage = useStore((state) => state.addMessage);
  const setLoading = useStore((state) => state.setLoading);

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !currentAgent) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: 'user' as const,
      timestamp: new Date(),
      agentId: currentAgent.id,
    };

    addMessage(userMessage);
    setInput('');
    setLoading(true);

    // Zakomentirana API metoda za slanje poruke
    // const aiResponse = await _apiSendMessage(currentAgent.id, input);
    // addMessage(aiResponse);

    // Simulacija AI odgovora
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response from ${currentAgent.name}. I'm trained on the documents you provided and I'll help you analyze them.`,
        role: 'assistant' as const,
        timestamp: new Date(),
        agentId: currentAgent.id,
      };
      addMessage(aiMessage);
      setLoading(false);
    }, 2000);
  };

  if (!currentAgent) {
    return (
      <Flex
        direction="column"
        h="calc(100vh - 2rem)"
        flex={1}
        bg="gray.50"
        m={4}
        ml={0}
        borderRadius="2xl"
        boxShadow="lg"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="xl" color="gray.500">
          Please select an agent from the sidebar to start chatting.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      h="calc(100vh - 2rem)"
      flex={1}
      bg="gray.50"
      m={4}
      ml={0}
      borderRadius="2xl"
      boxShadow="lg"
      overflow="hidden"
    >
      <Box bg="white" p={4} borderBottom="1px" borderColor="gray.200">
        <Heading size="md">Chat with {currentAgent.name}</Heading>
      </Box>

      <Box flex={1} overflowY="auto" p={6} id="chat-container">
        <VStack spacing={4} align="stretch">
          {messages
            .filter((msg) => msg.agentId === currentAgent?.id)
            .map((message, index) => (
              <SlideFade
                in={true}
                offsetY="20px"
                delay={index * 0.05}
                key={message.id}
              >
                <Box
                  alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
                  maxW="70%"
                  bg={message.role === 'user' ? 'blue.500' : 'gray.200'}
                  color={message.role === 'user' ? 'white' : 'black'}
                  p={4}
                  rounded="2xl"
                  shadow="md"
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  <Text>{message.content}</Text>
                </Box>
              </SlideFade>
            ))}
          {isLoading && (
            <SlideFade in={true} offsetY="20px">
              <Flex justify="flex-start" p={4}>
                <Spinner size="sm" color="blue.500" mr={3} />
                <Text color="gray.500">AI is thinking...</Text>
              </Flex>
            </SlideFade>
          )}
        </VStack>
      </Box>

      <Box p={4} borderTop="1px" borderColor="gray.200" bg="white">
        <Flex>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            mr={3}
            size="lg"
            borderRadius="xl"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            colorScheme="blue"
            onClick={handleSend}
            leftIcon={<Icon as={FiSend} />}
            size="lg"
            borderRadius="xl"
            px={8}
            _hover={{ transform: 'translateY(-2px)' }}
            transition="all 0.2s"
          >
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatInterface;
