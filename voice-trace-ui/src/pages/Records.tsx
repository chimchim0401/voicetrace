import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { 
    ChakraBaseProvider,
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
    useToast // Import useToast hook
} from '@chakra-ui/react';

const Records: React.FC = () => {
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state
    const toast = useToast(); // Initialize useToast hook
    
    const fetchRecords = async () => {
        const response = await axios.get('http://localhost:3000/auth/records');
        const records = response.data;
        // get the employee for each record
        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            const employeeId = record.employee;
            const employeeResponse = await axios.get(`http://localhost:3000/auth/employees/${employeeId}`);
            const employee = employeeResponse.data;
            record.employee = employee;
        }
        setRecords(records);
        setLoading(false); // Set loading state to false after data is fetched
    };
    // on click on view report button get the data from api and inject it into a new page (/report)
    const viewReport = async (recordId: string) => {
        const newWindow = window.open('/reports/' + recordId, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null

    }
    
    useEffect(() => {
        fetchRecords();
    }, []);
    
    return (
        <Container maxW='950px'>
            <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                textAlign="center"
                my={5}
            >Records</Heading>
            <Text fontSize='md' textAlign="center" >From here you can see all the records of the employees</Text>
            <Divider  my={5} />
            {loading ? ( // Render skeleton loading component while data is being fetched
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Employee</Th>
                            <Th>Duration</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>
                                <Skeleton height="20px" width="50px" />
                            </Td>
                            <Td>
                                <Skeleton height="20px" width="150px" />
                            </Td>
                            <Td>
                                <Skeleton height="20px" width="50px" />
                            </Td>
                            <Td>
                                <Skeleton height="20px" width="100px" />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <Skeleton height="20px" width="50px" />
                            </Td>
                            <Td>
                                <Skeleton height="20px" width="150px" />
                            </Td>
                            <Td>
                                <Skeleton height="20px" width="50px" />
                            </Td>
                            <Td>
                                <Skeleton height="20px" width="100px" />
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            ) : (
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Employee</Th>
                            <Th>Duration</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {records.map((record) => (
                            <Tr key={record._id}>
                                <Td>{record._id}</Td>
                                <Td>{record.employee.firstname} {record.employee.lastname}</Td>
                                <Td>{record.duree}</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton as={Button} >
                                            Actions
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={() => viewReport(record._id)}>View Report</MenuItem>
                                            <MenuItem>Delete</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Container>
    );
};

export default Records;
