import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.scss';

import Task from './components/tasks/Tasks';
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faTrashAlt, faTasks } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckCircle, faTrashAlt, faTasks)

function App() {
  return (
    <div>
      <Header/>
      <Container>
        <Task/>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
