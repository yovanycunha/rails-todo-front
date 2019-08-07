import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.scss';

import Task from './components/tasks/Tasks';
import Header from './components/header/Header';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckCircle, faTrashAlt)

function App() {
  return (
    <div>
      <Header/>
      <Container>
        <Task/>
      </Container>
    </div>
  );
}

export default App;
