import React from 'react';
import { Box, VStack, Text, Icon, Button, useDisclosure, SlideFade } from '@chakra-ui/react';
import { FiPlus, FiFile, FiMessageSquare } from 'react-icons/fi';
import useStore from '../store/useStore';
import NewAgentModal from './NewAgentModal';

const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { agents, currentAgent, setCurrentAgent } = useStore();

  return (
    <Box
      w={{ base: "full", md: "300px" }}
      h="calc(100vh - 2rem)"
      bg="gray.800"
      color="white"
      p={4}
      m={4}
      className="flex flex-col"
      borderRadius="2xl"
      boxShadow="lg"
    >
      <Button
        leftIcon={<Icon as={FiPlus} />}
        colorScheme="blue"
        mb={4}
        onClick={onOpen}
        borderRadius="lg"
        size="lg"
        _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
        transition="all 0.2s"
      >
        New Agent
      </Button>

      <VStack spacing={3} align="stretch" overflow="auto" className="custom-scrollbar">
        {agents.map((agent, index) => (
          <SlideFade in={true} offsetY="20px" delay={index * 0.1} key={agent.id}>
            <Box
              p={4}
              bg={currentAgent?.id === agent.id ? "blue.600" : "gray.700"}
              rounded="xl"
              cursor="pointer"
              onClick={() => setCurrentAgent(agent)}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
                bg: currentAgent?.id === agent.id ? "blue.500" : "gray.600"
              }}
              transition="all 0.2s"
            >
              <Text fontSize="sm" fontWeight="bold" display="flex" alignItems="center">
                <Icon as={FiMessageSquare} mr={2} />
                {agent.name}
              </Text>
              {agent.documents.map((doc) => (
                <Text 
                  key={doc.id} 
                  fontSize="xs" 
                  ml={6} 
                  color="gray.300"
                  display="flex"
                  alignItems="center"
                  mt={2}
                >
                  <Icon as={FiFile} mr={1} />
                  {doc.name}
                </Text>
              ))}
            </Box>
          </SlideFade>
        ))}
      </VStack>

      <NewAgentModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Sidebar;