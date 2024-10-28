import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import useStore from '../store/useStore';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore((state) => state.setUser);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    setTimeout(() => {
      setUser({
        id: '1',
        email,
        name: email.split('@')[0],
      });
      
      toast({
        title: isLogin ? 'Logged in successfully' : 'Registered successfully',
        status: 'success',
      });
    }, 1000);
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Box w="full" maxW="md" p={8} bg="white" rounded="lg" shadow="lg">
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {isLogin ? 'Login' : 'Register'}
          </Text>
          
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            w="full"
            onClick={handleSubmit}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>

          <Text
            cursor="pointer"
            color="blue.500"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Auth;