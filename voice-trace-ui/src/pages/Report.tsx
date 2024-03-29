import React from 'react';
import { useParams } from 'react-router-dom';
import { ChakraProvider, Box, SimpleGrid, Text, Container, Badge, Stack, Divider, AbsoluteCenter, Skeleton} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Conversation = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const toast = useToast();
  const [messages, setMessages] = useState<any[]>([]);
  const [summary, setSummary] = useState<any[]>([]);
  const [agent, setAgent] = useState('Agent');

  const fetchReport = async () => {
    const response = await axios.post('http://localhost:5000/auth/report', {
      id: id
    });
    setMessages(response.data.Messages);
    setSummary(response.data.Summary);
    const recintrem = await axios.get('http://localhost:5000/auth/records/');
    for (let i = 0; i < recintrem.data.length; i++) {
      if (recintrem.data[i]._id === response.data.Record) {
        const interm = await axios.get('http://localhost:5000/auth/employees/' + recintrem.data[i]._id);
        //setAgent(interm.data.firstname + ' ' + interm.data.lastname);
        break;
      }
    }
    
    setLoading(false);
  }
  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <ChakraProvider> 
      <Container mt={5} maxW='container.sm' bg='white' color='black'>
        <Box position='relative' padding='5'>
          <Divider />
          <AbsoluteCenter bg='white' px='4'>
            <Badge variant='solid' colorScheme='green' fontWeight="bold">Conversation</Badge>
          </AbsoluteCenter>
        </Box>
      </Container>
      <Container backgroundColor={'gray.100'} maxW='container.sm' bg='white' color='black' maxH={500} overflowY='scroll'>
        <SimpleGrid columns={1} spacing={4}>
          {loading ? (
            // Show skeleton when loading messages
            <Skeleton height="100px" />
          ) : (
            messages.map((message) => (
              <Box
                key={message.id}
                p={3}
                borderRadius="md"
                alignSelf={message.speaker === 'A' ? 'flex-start' : 'flex-end'}
                ml={message.speaker === 'A' ? '0' : 'auto'}
                mr={message.speaker === 'A' ? 'auto' : '0'}
                bg={message.speaker === 'A' ? '#8EACCD' : '#E2E8F0'}
              >
                <Text fontWeight="bold">{message.speaker === 'A' ? agent : 'Customer'}</Text>
                <Text>{message.text}</Text>
              </Box>
            ))
          )}
        </SimpleGrid>
      </Container> 
      
      <Container mt={5} maxW='container.sm' bg='white' color='black'> 
        <Box position='relative' padding='5'>
          <Divider />
          <AbsoluteCenter bg='white' px='4'>
            <Badge variant='solid' colorScheme='green' fontWeight="bold">Summary</Badge>
          </AbsoluteCenter>
        </Box>
        <Stack direction='row'>
          {loading ? (
            // Show skeleton when loading summary
            <Skeleton height="20px" width="100%" />
          ) : (
            <Box borderRadius="md" bg='#8EACCD' w='100%' p={4} color='gray.700'>
              <Text fontWeight="bold">{summary}</Text>
            </Box>
          )}
        </Stack>
      </Container>
    </ChakraProvider>
  );
};

export default Conversation;
