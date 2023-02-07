import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import {App} from './Components';
import { BrowserRouter as Router} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider,PostsProvider } from './Providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <toast position="top-left" autoClose={5000}>
        <AuthProvider>
          <PostsProvider>
           <App />
        </PostsProvider>
        </AuthProvider>
     </toast>
    </Router>
  </React.StrictMode>
);


