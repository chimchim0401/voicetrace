import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {
  ChakraProvider,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Divider,
  Skeleton,
  useToast,
} from '@chakra-ui/react';
import { AuthProvider } from '../AuthContext';
import Navbar from '../components/Navbar';


const Records: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/records');
      const records = response.data;

      for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const employeeId = record.employee;
        const employeeResponse = await axios.get(`http://localhost:5000/auth/employees/${employeeId}`);
        const employee = employeeResponse.data;
        record.employee = employee;
      }

      setRecords(records);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching records:', error);
      setLoading(false);
    }
  };

  const viewReport = (recordId: string) => {
    const newWindow = window.open(`/report/${recordId}`, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }; 
  

  useEffect(() => {
    fetchRecords();
  }, []);

    function deleteReport(): void {
        throw new Error('Function not implemented.');
    }

  return (

    <ChakraProvider>
      <Navbar />
      <Container maxW='xl' mt={5} bg='white' color='black'>
        <Heading as='h1' size='xl' fontWeight='bold' textAlign='center' my={5}>
          Records
        </Heading>
        <Text fontSize='md' textAlign='center'>
          From here you can see all the records of the employees
        </Text>
        <Divider my={5} />
        {loading ? (
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Employee</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {[1, 2].map((index) => (
                <Tr key={index}>
                  <Td>
                    <Skeleton height='20px' width='50px' />
                  </Td>
                  <Td>
                    <Skeleton height='20px' width='150px' />
                  </Td>
                  <Td>
                    <Skeleton height='20px' width='100px' />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Table variant='striped' colorScheme='teal'>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Employee</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {records.map((record) => (
                <Tr key={record._id}>
                  <Td>{record._id}</Td>
                  <Td>{`${record.employee.firstname} ${record.employee.lastname}`}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button}>Actions</MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => viewReport(record._id)}>View Report</MenuItem>
                        <MenuItem >Delete</MenuItem> 
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Container>
    </ChakraProvider>
  );
};

export default Records;
