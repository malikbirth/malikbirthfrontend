import React, { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Link as ReachLink } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,WrapItem
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiPlus,
  FiList
} from 'react-icons/fi';
import {AiOutlineWallet, AiOutlineBank, AiOutlineReload} from 'react-icons/ai'
import { axi as axios } from '.././utils/axios'

const LinkItems  = [
  { name: 'Home', icon: FiHome, href:'/dashboard' },
  { name: 'Profile', icon: FiUser, href:'profile' },
  { name: 'New', icon: FiPlus, href:'newbirth' },
  { name: 'All Certificates', icon: FiList, href:'allbirth' },
  { name: 'Add Money', icon: AiOutlineWallet, href:'add' },
  
];

export default function SidebarWithHeader({ children, username, setuser  }) {
  const reLoad = () => {
    axios.get('/api/profile').then( res => {
      setuser(res.data)
    }).catch( err => {
      console.log(err)
    })
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav username={username} onOpen={onOpen} reLoad={reLoad}/>
      <Box ml={{ base: 0, md: 60 }} p="2">
        {children}
      </Box>
    </Box>
  );
}



const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
          MALIKBIRTHPORTAL
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};


const NavItem = ({ icon, href,children, ...rest }) => {
  return (
    <Link as={ReachLink} to={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'pink.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};


const MobileNav = ({ onOpen, username,reLoad,...rest }) => {
  const navigate = useNavigate();
  return (
    <>
    <Flex
      position='fixed'
      left='0%'
      right='0%'
      zIndex='2'
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box
        display={{ base: 'flex', md: 'none' }}
        >
        <Image src="/main-logo.png" h='50px' w='50px' ml='18px' />
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<AiOutlineReload />}
          onClick={reLoad}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
              <WrapItem>
                <Avatar name={username} size='sm' src='' />
              </WrapItem>
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{username}</Text>
                  
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList p='2'
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={()=> navigate('profile')}>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={()=> {
                if(localStorage.getItem('token')){
                  localStorage.removeItem('token');
                  navigate('/')
                }else{
                  navigate('/')
                }
              }}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
    <Box h='20' w='100'></Box>
    </>
  );
};