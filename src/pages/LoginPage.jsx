import { Box, Card, Input, Stack } from '@chakra-ui/react';
import './LoginPage.css';

const LoginPage = () => {
    return (
        <div className='body'>
            <Input type='email' placeholder='Digite seu Email'/>
            <Input type='password' placeholder='Digite sua Senha'/>
        </div>
    );
}

export default LoginPage;

//npm install react-router-dom npm install classnames