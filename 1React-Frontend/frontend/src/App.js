import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApplicationRoutes from './route/ApplicationRoutes';
import { withCookies } from 'react-cookie';

function App() {
  
  return ApplicationRoutes(); 
}

export default withCookies(App);
