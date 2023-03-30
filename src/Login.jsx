import './Login.css';
import { Link } from 'react-router-dom';
import {
  Box, Flex, Text, Alert,
  AlertIcon, Input, Stack, Button, useToast, Image, Center
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {axi as axios} from './utils/axios';


export default function Login(props) {
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])
  const [user, setuser] = useState({ username: '', password: '' });
  const [err_msg, set_msg] = useState('');
  const [loading, setloading] = useState(false);
  const Login = (userinfo) => {
    axios.post('/api/login',userinfo).then((res)=>{
        console.log(res)
        localStorage.setItem("token",res.data.token);
        toast({
          title: 'Login',
          description: "Login Success !",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        navigate("/dashboard")
      }
    ).catch( err => {
      console.log(err)
      set_msg(err.message)
      setloading(false);
    })
  }
  const handleClick = () => {
    if (user.username && user.password) {
      set_msg('')
      setloading(true);
      Login(user)
    } else {
      toast({
        title: 'Login',
        description: "Username or Password Not Be Blanked",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  const handleChange = ({ target: { name, value } }) => {
    setuser({
      ...user,
      [name]: value
    })
  }


  return <>
    <Flex align="center" w="100%" h="100vh" justify="center" px="10px">
      <Box display="flex" flexDirection="column" gap="10px" py='10px' px="4">
        <Center mt='10'> <Image src="/main-logo.png" w="120px" h="120px" /></Center>
        <Text backgroundColor={"pink.500"} textAlign="center" textTransform={"uppercase"} fontWeight="bold" p="1" borderRadius={"5px"}><marquee style={{ color: '#ffffff' }}>
          WELLCOME TO MALIKBIRTHPORTAL

        </marquee></Text>
        <Text textAlign="center" backgroundColor={"pink.500"}  textTransform={"uppercase"} fontWeight="bold" p="1" borderRadius={"5px"}><marquee style={{ color: '#ffffff' }}>

          रजिस्टर करने पर 20रु० बोनस के रूप में आपके वॉलेट में जुड़ जाये गा

        </marquee></Text>
        <hr />
        <Stack spacing={8} my="10px">
          <Text fontSize="27px" textAlign="center" textColor={"pink.500"}>LOGIN</Text>
          {err_msg && <Alert status='error'>
            <AlertIcon />
            {err_msg}
          </Alert>}
          <Input focusBorderColor='pink.300' type="text" colorScheme={"pink"} placeholder="Username" name="username" onChange={handleChange} value={user.username} />
          <Input focusBorderColor='pink.300' type="password" colorScheme={"pink"} placeholder="Password" name="password" onChange={handleChange} value={user.password} />
          {loading ?
            <Button
              isLoading
              loadingText='Wait For Login'
              colorScheme={"pink"}
              variant='outline'
              spinnerPlacement='end'
            /> :
            <Button colorScheme={"pink"} variant={"solid"} onClick={handleClick}>
              Login
            </Button>
          }
        </Stack>
      </Box>
    </Flex>
  </>
}