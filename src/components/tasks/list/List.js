import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import UpdateTask from '../update/UpdateTask';

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

async checkTask(task) {
  await fetch(`https://murmuring-citadel-83821.herokuapp.com/tasks/${task.id}`, 
  {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      task: {done: true}
    })
  });
  this.props.loadTasks();
}

async deleteTask(task) {
  if (window.confirm(`Remover: ${task.title}`)) {
    await fetch(`https://murmuring-citadel-83821.herokuapp.com/tasks/${task.id}`, {method: 'DELETE'});
    this.props.loadTasks();
  }
}

toggle(index) {
  this.setState({
    open: !this.state.open,
  })
}
  
  render() {
    return (
      <div>
        
        <Card>
          <Card.Body>
          <Table responsive>
            <tbody>
              {this.props.tasks.map((task, index) => {
                return <tr key={task.id}>
                  <td className="col-md-10">{task.title}</td>
                  <td>
                    { 
                      task.done === false
                      ? <Button className="check act-btn" href="#">
                          <FontAwesomeIcon icon="check-circle" onClick={() => this.checkTask(task)} size='lg'/>
                        </Button> 
                      : null
                    }
                  </td>
                  <td>
                    {
                      <Accordion>
                      <Accordion.Toggle className="edit act-btn" eventKey="0" as={Button}>
                        <FontAwesomeIcon icon="pen" size="lg"/>
                      
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <UpdateTask loadTasks={this.props.loadTasks} task={task}/>
                      </Accordion.Collapse>
                      </Accordion>
                    }
                  </td>
                  <td>
                    <Button className="delete act-btn" href="#" onClick={() => this.deleteTask(task)}>
                      <FontAwesomeIcon icon="trash-alt"/>
                    </Button>
                  </td>
                </tr>;
              })}
            </tbody>
          </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default List;