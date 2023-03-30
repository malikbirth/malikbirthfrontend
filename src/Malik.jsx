import { Stack,Flex, Text, Card , CardHeader,Heading, CardBody, Box, StackDivider, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Malik(props){
  const [user , setuser] = useOutletContext();
  
  return(
    <Card>
  <CardHeader>
    <Heading size='md' textTransform='uppercase'>WELLCOME :) {user.username}</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Wallet Balance 
        </Heading>
        <Text pt='2' fontSize='sm'>
          $ {user.coins}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
            Offers
        </Heading>
        <Text pt='2' fontSize='sm'>
          20 Rupe Bonus On New Account
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          NEWS
        </Heading>
        <Text pt='2' fontSize='sm'>
          0 Balance पर खाता खोले ....
        </Text>
      </Box>
    </Stack>
  </CardBody>
</Card>
    
  )
}