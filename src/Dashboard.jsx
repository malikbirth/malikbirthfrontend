import './Dashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Flex, Spacer,Box, Heading  } from '@chakra-ui/react';
import {axi as axios } from './utils/axios';

export default function Dashboard(props){
  const navigate = useNavigate();
  const [ user , setuser ] = useState({});
  useEffect(()=>{
    axios.defaults.headers.common['token'] = localStorage.getItem('token');
    axios.get('/api/profile').then( res => {
      setuser(res.data)
    }).catch( err => {
      console.log(err)
    })
  },[])
  useEffect( () => {
    if(!localStorage.getItem('token')) 
      return navigate('/')
  }, [])
  return <>
    <Header username={user.username} setuser={setuser} children={<Outlet context={[user, setuser]}/>}/>
  </>
}