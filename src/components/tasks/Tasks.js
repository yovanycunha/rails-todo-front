import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import CreateTask from './create/CreateTasks';
import Button from 'react-bootstrap/Button';

const _HEROKU_URL = `https://murmuring-citadel-83821.herokuapp.com/tasks`;

class Tasks extends Component {

  constructor(props){
    super(props);
    this.state = {
      tasks: [],
    };
    this.loadTasks = this.loadTasks.bind(this)
  }

  async loadTasks() {
    let response = await fetch(_HEROKU_URL);
    const tasks = await response.json();
    this.setState({
      tasks: tasks
    });
    console.log(tasks);
    
  }

  componentDidMount() {
    this.loadTasks();
  }

  render() {
    return (
      <Row>
        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
          <p className="title">To-do</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done !== true)}/>
          <CreateTask loadTasks={this.loadTasks}/>
        </Col>
        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
          <p className="title">Done</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done == true)}/>
          <Button variant="red" className='float-right remove_tasks_btn'>Remover Todas</Button>
        </Col>
      </Row>
    );
  }
}

export default Tasks;