import './Profile.css';
import { useNavigate } from "react-router-dom"
import { useState , useEffect } from 'react';
import { Stack, Text, Card , CardHeader,Heading, CardBody, Box, StackDivider, Button } from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup ,useToast} from '@chakra-ui/react'
import { useOutletContext } from "react-router-dom";

export default function Profile(props){
  const [user , setuser] = useOutletContext();
  const toast = useToast();
  const navigate = useNavigate();
  const [loading , setloading ] = useState(false);
  const Logout = () => {
    setloading(true);
    localStorage.removeItem("token");
    navigate('/');
    toast({
          title: 'Logout',
          description: "Logout Success !",
          status: 'success',
          duration: 2000,
          isClosable: true,
    })
  }
  
  return (
      
<Stack direction='column' spacing={4} py='10px' px='12px' my="70px">
        
        <Card>
          <CardHeader>
            <Heading size='md' textAlign='center'>PROFILE</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider/>} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  id
                </Heading>
                <Text pt='2' fontSize='sm'>{user.id}</Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  username
                </Heading>
                <Text pt='2' fontSize='sm'>{user.username}</Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Balence
                </Heading>
                <Text pt='2' fontSize='sm'>$ {user.coins}</Text>
              </Box>
              <Box>
                {
                  loading ? <Button  w='100%' variant='outline' colorScheme='blue' isLoading>Logout</Button> : <Button  w='100%' variant='outline' colorScheme='blue' onClick={Logout}>Logout</Button>
                }
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
  )
}

/*


*/