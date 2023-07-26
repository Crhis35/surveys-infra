import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from './providers/query.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <QueryProvider>
          <App />
        </QueryProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
