// src/components/NewAgentModal.tsx
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
  HStack,
  IconButton,
} from '@chakra-ui/react';
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import useStore from '../store/useStore';
import { Agent, Document } from '../types';
import { FiTrash2 } from 'react-icons/fi';

interface NewAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentToEdit?: Agent | null;
}

export default function NewAgentModal({
  isOpen,
  onClose,
  agentToEdit = null,
}: NewAgentModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const addAgent = useStore((state) => state.addAgent);
  const updateAgent = useStore((state) => state.updateAgent);
  const toast = useToast();

  useEffect(() => {
    if (agentToEdit) {
      setName(agentToEdit.name);
      setDescription(agentToEdit.description);
      setCustomPrompt(agentToEdit.customPrompt);
      setDocuments(agentToEdit.documents);
    } else {
      setName('');
      setDescription('');
      setCustomPrompt('');
      setDocuments([]);
    }
  }, [agentToEdit]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newDocs = acceptedFiles.map((file) => ({
      id: Date.now().toString() + file.name,
      name: file.name,
      type: 'pdf' as const,
      url: URL.createObjectURL(file),
    }));
    setDocuments((prevDocs) => [...prevDocs, ...newDocs]);
  }, []);

  const removeDocument = (docId: string) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
  };

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

    const agentData: Agent = {
      id: agentToEdit ? agentToEdit.id : Date.now().toString(),
      name,
      description,
      customPrompt,
      documents,
    };

    if (agentToEdit) {
      updateAgent(agentData);
      toast({
        title: 'Success',
        description: 'Agent updated successfully',
        status: 'success',
      });
    } else {
      addAgent(agentData);
      toast({
        title: 'Success',
        description: 'Agent created successfully',
        status: 'success',
      });
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{agentToEdit ? 'Update Agent' : 'Create New AI Agent'}</ModalHeader>
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
                  {isDragActive
                    ? 'Drop the files here...'
                    : 'Drag and drop files here, or click to select files'}
                </Text>
              </Box>
              <VStack mt={2} align="start">
                {documents.map((doc) => (
                  <HStack key={doc.id} w="full" justifyContent="space-between">
                    <Text>{doc.name}</Text>
                    <IconButton
                      aria-label="Remove Document"
                      icon={<FiTrash2 />}
                      size="sm"
                      variant="ghost"
                      onClick={() => removeDocument(doc.id)}
                    />
                  </HStack>
                ))}
              </VStack>
            </FormControl>

            <Button colorScheme="blue" onClick={handleSubmit} w="full" mt={4}>
              {agentToEdit ? 'Update Agent' : 'Create Agent'}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
