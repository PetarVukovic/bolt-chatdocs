// src/components/Sidebar.tsx
import React from 'react';
import {
  Box,
  VStack,
  Text,
  Icon,
  Button,
  useDisclosure,
  SlideFade,
  Flex,
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiFile,
  FiMessageSquare,
  FiEdit2,
  FiTrash2,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import useStore from '../store/useStore';
import NewAgentModal from './NewAgentModal';
import { Agent } from '../types';

const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const agents = useStore((state) => state.agents);
  const currentAgent = useStore((state) => state.currentAgent);
  const setCurrentAgent = useStore((state) => state.setCurrentAgent);
  const deleteAgent = useStore((state) => state.deleteAgent);
  const logout = useStore((state) => state.logout);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = React.useState(false);
  const cancelRef = React.useRef(null);
  const toast = useToast();
  const [agentToEdit, setAgentToEdit] = React.useState<Agent | null>(null);

  const handleNewAgent = () => {
    setAgentToEdit(null); // Resetiramo agentToEdit kada kreiramo novog agenta
    onOpen();
  };

  const handleEditAgent = (agent: Agent) => {
    setAgentToEdit(agent); // Postavljamo agentToEdit na odabranog agenta
    onOpen();
  };

  const handleDelete = (agentId: string) => {
    deleteAgent(agentId);
    toast({
      title: 'Agent deleted',
      description: 'The agent has been deleted successfully.',
      status: 'success',
    });
  };

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
      status: 'success',
    });
  };

  return (
    <Box
      w={{ base: 'full', md: '300px' }}
      h="calc(100vh - 2rem)"
      bg="gray.800"
      color="white"
      p={4}
      m={4}
      display="flex"
      flexDirection="column"
      borderRadius="2xl"
      boxShadow="lg"
    >
      <Button
        leftIcon={<Icon as={FiPlus} />}
        colorScheme="blue"
        mb={4}
        onClick={handleNewAgent}
        borderRadius="lg"
        size="lg"
        _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
        transition="all 0.2s"
      >
        New Agent
      </Button>

      <VStack
        spacing={3}
        align="stretch"
        overflow="auto"
        flex="1"
        className="custom-scrollbar"
      >
        {agents.map((agent, index) => {
          const isSelected = currentAgent?.id === agent.id; // Provjeravamo je li agent trenutno odabran
          return (
            <SlideFade
              in={true}
              offsetY="20px"
              delay={index * 0.1}
              key={agent.id}
            >
              <Box
                p={4}
                borderWidth="2px"
                borderColor={isSelected ? 'blue.500' : 'orange.400'} // Mijenjamo boju okvira ako je odabran
                bg={isSelected ? 'blue.600' : 'transparent'} // Mijenjamo pozadinsku boju ako je odabran
                rounded="xl"
                cursor="pointer"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                  borderColor: isSelected ? 'blue.600' : 'orange.500', // Mijenjamo boju okvira pri hoveru
                }}
                transition="all 0.2s"
                onClick={() => setCurrentAgent(agent)}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={FiMessageSquare} mr={2} />
                    {agent.name}
                  </Text>
                  <Flex>
                    <IconButton
                      aria-label="Edit Agent"
                      icon={<FiEdit2 />}
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAgent(agent);
                      }}
                    />
                    <IconButton
                      aria-label="Delete Agent"
                      icon={<FiTrash2 />}
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(agent.id);
                      }}
                    />
                  </Flex>
                </Flex>
                {agent.documents.map((doc) => (
                  <Text
                    key={doc.id}
                    fontSize="md"
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
          );
        })}
      </VStack>

      <Flex mt={4} justifyContent="center">
        <IconButton
          aria-label="Settings"
          icon={<FiSettings />}
          variant="ghost"
          colorScheme="whiteAlpha"
          size="lg"
          mr={4}
          onClick={() => {
            // Implement settings modal
          }}
        />
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut />}
          variant="ghost"
          colorScheme="whiteAlpha"
          size="lg"
          onClick={handleLogout}
        />
      </Flex>

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={isLogoutDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsLogoutDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you want to logout?</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsLogoutDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <NewAgentModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setAgentToEdit(null); // Resetiramo agentToEdit kada zatvorimo modal
        }}
        agentToEdit={agentToEdit}
      />
    </Box>
  );
};

export default Sidebar;
