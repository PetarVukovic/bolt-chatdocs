import React, { useState } from 'react';
import { Box, Flex, Text, Input, Button, VStack, Icon, Spinner, SlideFade } from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import useStore from '../store/useStore';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, currentAgent, isLoading, addMessage, setLoading } = useStore();

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
    
    // Simulate AI response
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
      <Box flex={1} overflowY="auto" p={6}>
        <VStack spacing={4} align="stretch">
          {messages.map((message, index) => (
            <SlideFade in={true} offsetY="20px" delay={index * 0.1} key={message.id}>
              <Box
                alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
                maxW="70%"
                bg={message.role === 'user' ? 'blue.500' : 'white'}
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