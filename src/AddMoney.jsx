import { Stack, Text, Card , CardHeader,Heading, CardBody, Box, StackDivider, Button, Link} from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup ,useToast} from '@chakra-ui/react'
import { AiOutlineWhatsApp } from "react-icons/ai"
export default function AddMoney(props){
  return(
    <Stack direction='column' spacing={4} py='10px' px='12px' >
        <Card>
          <CardHeader>
            <Heading size='md' textAlign='center'>ADD MONEY</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider/>} spacing="4">
              <Box mx="auto">
                <img src="/qrcode.jpg" width="220px" />
              </Box>
              <Box fontWeight={"bold"} display={'flex'} alignItems='center' justifyContent={'center'} size="s"><p>पैसा ऐड करने के बाद स्क्रीनशॉट लेकर इस व्हात्सप्प नंबर  9026241920 पर सेंड करे </p><span style={{marginLeft:'10px', fontSize:'22px', color:'#128C7E'}}><Link href="https://wa.me/919026241920" target="_blank"><AiOutlineWhatsApp/></Link></span></Box>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
  )
}