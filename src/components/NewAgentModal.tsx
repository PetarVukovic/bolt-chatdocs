import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Box,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useStore from '../store/useStore';

interface NewAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewAgentModal({ isOpen, onClose }: NewAgentModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const addAgent = useStore((state) => state.addAgent);
  const toast = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload logic here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
  });

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide a name for the agent',
        status: 'error',
      });
      return;
    }

    const newAgent = {
      id: Date.now().toString(),
      name,
      description,
      customPrompt,
      documents: [],
    };

    addAgent(newAgent);
    onClose();
    setName('');
    setDescription('');
    setCustomPrompt('');

    toast({
      title: 'Success',
      description: 'Agent created successfully',
      status: 'success',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New AI Agent</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Agent Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter agent name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter agent description"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Custom Prompt</FormLabel>
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter custom prompt for the agent"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Upload Documents</FormLabel>
              <Box
                {...getRootProps()}
                p={4}
                border="2px dashed"
                borderColor={isDragActive ? 'blue.400' : 'gray.200'}
                rounded="md"
                textAlign="center"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ borderColor: 'blue.400' }}
              >
                <input {...getInputProps()} />
                <Text color="gray.500">
                  {isDragActive ? 'Drop the files here...' : 'Drag and drop files here, or click to select files'}
                </Text>
              </Box>
            </FormControl>

            <Button colorScheme="blue" onClick={handleSubmit} w="full" mt={4}>
              Create Agent
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
