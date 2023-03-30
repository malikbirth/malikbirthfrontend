import './AllBirth.css';
import { useState , useEffect,useRef } from "react";
import { Link } from 'react-router-dom';

import { Stack, Text, Card , CardHeader,Heading, CardBody, Box, StackDivider, Button } from "@chakra-ui/react"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { axi as axios } from './utils/axios';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  useToast
} from '@chakra-ui/react'

export default function AllBirth(props){
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [data , setdata ] = useState([]);
  const delete_rec = (cur_id) => {
    onOpen()
    localStorage.setItem('_curId', cur_id)
  }
  const submit = () => {
    onClose()
    const id = localStorage.getItem('_curId');
    localStorage.removeItem('_curId');
    axios.delete(`/api/delete/${id}`).then( res => {
      toast({
          title: 'Delete',
          description: res.data.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      setTimeout(function() {
        
        toast({
          title: 'ReLoading .....',
          description: '',
          status: 'success',
          duration: 1000,
          isClosable: false,
        });
        axios.get('/api/birthOrders').then( res => {
      setdata(res.data.data)
    }).catch( err => {
      console.log(err)
    })
        
        
      }, 5000);
    }).catch( err => {
        toast({
          title: 'Delete',
          description:err.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      
    })
  }
  useEffect(()=>{
    axios.get('/api/birthOrders').then( res => {
      setdata(res.data.data)
    }).catch( err => {
      console.log(err)
    })
  },[])
  return (
    <>
    
    <Stack direction='column' spacing={4} py='10px' px='12px' >
      <Card>
      
          <CardHeader>
        <Heading size="md" textAlign="center">ALL BIRTH CERTIFICATES</Heading>
        
          </CardHeader>
          <hr/>
          <CardBody>
        <TableContainer mt="10">
  <Table variant='simple' size="md">
    <Thead>
     
      
        <Tr>
        <Th>Sr no</Th>  
        <Th>NAME</Th>
        <Th>TIME</Th> 
        <Th>ID</Th>
        <Th>VIEW</Th>
        <Th>EDIT</Th>
        <Th>DELETE</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        data.map( (e , i)=> {
          return <Tr key={e._id}>
          <Td>{i+1}</Td>
          <Td>{e.name}</Td>
          <Td>{e.time}</Td>
          <Td>{e._id}</Td>
          <Td><a href={`/api/view/birth/${e._id}`} target='_blank'><Button size='sm' colorScheme='blue' variant='outline'>VIEW</Button></a></Td>
          <Td><Link to={`../edit?${e._id}`}><Button size='sm' colorScheme='yellow' variant='outline'>EDIT</Button></Link></Td>
          <Td><Button size='sm' colorScheme='red' variant='outline' onClick={()=> {delete_rec(e._id)}}>DELETE</Button></Td>
          </Tr>
        })
      }
    </Tbody>
  </Table>
</TableContainer>
</CardBody>
      </Card>
    </Stack>
    
    
    
    
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Are You Sure ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text> Want To Delete</Text>
            <Text mt='2' color="pink.500">EveryThings Will Be Permanent Delete</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='pink' ml={3} onClick={submit}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    
    
    
  </>
  )
}