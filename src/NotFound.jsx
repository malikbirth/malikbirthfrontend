import './NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFound(props){
  return <div className='main'><div>
  <h1 className='a-h'>404</h1><h1 className='a-h'>Not Found </h1>
  <h1 className='a-h'><Link to="dashboard">Go Back </Link></h1>
  </div></div>
}