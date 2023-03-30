import './NewBirth.css'
import React, { useState, } from 'react';
import { Flex, Spinner, useDisclosure, VStack } from '@chakra-ui/react'
import {Heading , Stack, Box ,FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, Input, Text, RadioGroup , Radio, HStack, Button, useToast} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'



import { axi as axios } from './utils/axios';



export default function NewBirth(props){
  const toast = useToast();
  const [ data , setdata] = useState({
    name: "",
    adhar_number : "",
    dob : "",
    dob_en : "",
    gen : "",
    pob : "",
    fa_name : "",
    fa_adhar_num : "",
    mo_name : "",
    mo_adhar_num : "",
    village : "",
    post : "",
    block : "",
    thana : "",
    district : "",
    state : "",
    zipcode : ""
  });
  // for alert dialoag.......
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

  
  //
  const [ loading , set_loading] = useState(false);
  
  const handleChange= ({target: {name, value}}) => {
    setdata({
      ...data,
      [name] : value
    })
  }
  const submit = () => {
    onClose()
    // validating here  .....
    set_loading(true);
    axios.post('/api/newbirth',{data : data}).then(res=>{
      if(res.data.birthID){
        set_loading(false)
        toast({
          title: 'Submit',
          description: `${res.data.birthID} Created !`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
    setdata({
    name: "",
    adhar_number : "",
    dob : "",
    dob_en : "",
    gen : "",
    pob : "",
    fa_name : "",
    fa_adhar_num : "",
    mo_name : "",
    mo_adhar_num : "",
    village : "",
    post : "",
    block : "",
    thana : "",
    district : "",
    state : "",
    zipcode : ""
      });
      }
    }).catch( err => {
      set_loading(false)
         toast({
          title: 'Server Error',
          description: `${err.response.data.message}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
    
    
  //   fetch('', {
  //     method: "post",
  //     headers: {
  //       token : localStorage.getItem('token'),
  //       'Content-Type': 'application/json'
  //     },
  //     body : JSON.stringify({
  //       data : data
  //     })
  //   }).then( res => res.json()).then( data => {
  //     if(data.birthID){
  //       

  // toast({
  //         title: 'Submit',
  //         description: `${data.birthID} Created !`,
  //         status: 'success',
  //         duration: 3000,
  //         isClosable: true,
  //       })
  //     }else {
  //       set_loading(false)
        
  // toast({
  //         title: 'Submit',
  //         description: `${data.message}`,
  //         status: 'error',
  //         duration: 3000,
  //         isClosable: true,
  //       })
  //       console.log(data)
  //     }
  //   }).catch( err => {
  //     set_loading(false)
  //     toast({
  //         title: 'Server Error',
  //         description: `${err.message}`,
  //         status: 'error',
  //         duration: 3000,
  //         isClosable: true,
  //       })
  //   })
  }
  return(
    <>{
      loading &&
      <Box backgroundColor="rgba(0,0,0,.3)" w='100vw' h='100%' display='grid' placeItems='center' pos="fixed" top="0" left="0" zIndex="2">
                   <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='pink.600'
  size='xl'
    />
      </Box>}
      <Stack backgroundColor={"#fff"}>
        <Heading size='lg' fontWeight={'bold'} my="5" textAlign='center'>APPLY NEW BIRTH CERTIFICATE</Heading>
        <hr/>
        <Box py="8" px='4'>
        <Text textAlign="center" size='s' textTransform='uppercase' mb='40px' fontWeight="bold">नोट : सब कुछ कैपिटल लेटर में लिखना जरुरी है </Text>
          <FormControl >

    
          <Flex flexWrap={'wrap'}>
            <Box px='2' minW={'50%'}>



          <FormLabel>NAME</FormLabel>
          <Input name='name'  focusBorderColor='pink.300' placeholder='NAME' onChange={handleChange} value={data.name}/>
          
          <FormLabel pt='4'>AADHAR NUMBER</FormLabel>
          <Input  focusBorderColor='pink.300'   name='adhar_number' onChange={handleChange} placeholder='AADHAR NUMBER' type='number' value={data.adhar_number}/>
            <FormLabel pt='4'>DOB</FormLabel>
          <Input  focusBorderColor='pink.300' name='dob' onChange={handleChange} placeholder='Ex. 02/07/2005' type='text' value={data.dob}/>
            <FormLabel pt='4'>DOB IN ENGLISH</FormLabel>
          <Input  focusBorderColor='pink.300' name='dob_en' onChange={handleChange} placeholder='Ex. 7 JULY TWO THOUSAND FIVE' type='text' value={data.dob_en}/>
          
          
          
          <FormLabel pt='4'>PLACE OF BIRTH</FormLabel>
          <Input  focusBorderColor='pink.300' name='pob' onChange={handleChange} placeholder='PLACE OF BIRTH' type='text' value={data.pob}/>
         
         
          <FormLabel pt='4' >GENDER</FormLabel>
          <Input  focusBorderColor='pink.300' name='gen' onChange={handleChange} placeholder='MALE OR FEMALE' type='text' value={data.gen} mb={'4'}/>
          
          </Box>
          
          <Box px='2'  minW={'50%'}>
          
          <FormLabel>FATHER NAME</FormLabel>
          <Input  focusBorderColor='pink.300' name="fa_name" onChange={handleChange} placeholder='FATHER NAME' type='text' value={data.fa_name}/>
         
          <FormLabel pt='4'>FATHER AADHAR NUMBER</FormLabel>
          <Input  focusBorderColor='pink.300' name="fa_adhar_num" onChange={handleChange} placeholder='FATHER AADHAR NUMBER' type='number' value={data.fa_adhar_num}/>
          
           <FormLabel pt='4'>MOTHER NAME</FormLabel>
          <Input  focusBorderColor='pink.300' name="mo_name" onChange={handleChange} placeholder='MOTHER NAME' type='text' value={data.mo_name}/>
         
          <FormLabel pt='4'>MOTHER AADHAR NUMBER</FormLabel>
          <Input  focusBorderColor='pink.300' name="mo_adhar_num" onChange={handleChange} placeholder='MOTHER AADHAR NUMBER' type='number' value={data.mo_adhar_num}/>
          <FormLabel pt='4'>VILLAGE</FormLabel>
          <Input  focusBorderColor='pink.300' name='village' value={data.village} onChange={handleChange} placeholder='VILLAGE' type='text'/>
          <FormLabel pt='4'>POST</FormLabel>
          <Input  focusBorderColor='pink.300' name="post" value={data.post} onChange={handleChange} placeholder='POST' type='text'/>
          
          
          </Box>
          </Flex>
          <Box p="2">

          <FormLabel pt='4'>THANA</FormLabel>
          <Input  focusBorderColor='pink.300' name="thana" value={data.thana} onChange={handleChange} placeholder='THANA' type='text'/>
          <FormLabel pt='4'>BLOCK</FormLabel>
          <Input  focusBorderColor='pink.300' name="block" value={data.block} onChange={handleChange} placeholder='BLOCK' type='text'/>
          <FormLabel pt='4'>DISTRICT</FormLabel>
          <Input  focusBorderColor='pink.300' name='district' value={data.district} onChange={handleChange} placeholder='DISTRICT' type='text'/>
           <FormLabel pt='4'>STATE</FormLabel>
          <Input  focusBorderColor='pink.300' name='state' value={data.state} onChange={handleChange} placeholder='STATE' type='text'/>
           <FormLabel pt='4'>ZIP CODE</FormLabel>
          <Input  focusBorderColor='pink.300' name="zipcode" value={data.zipcode} onChange={handleChange} placeholder='ZIP CODE' type='number'/>
          </Box>
          <Box mt='4' w='100%'>
            <Button colorScheme='pink' variant='outline' w='100%' onClick={onOpen}>
         SUBMIT
         </Button>
          </Box>
          </FormControl>
        </Box>
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
            <Text>Everything is correct ?</Text>
            <Text mt='2' color="pink.500">Charge : Rs. 20 </Text>
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