import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router/>
      </ChakraProvider>
    </div>
  );
}

export default App;
