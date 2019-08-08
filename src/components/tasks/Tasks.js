import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import List from './list/List';
import CreateTask from './create/CreateTasks';
import Container from 'react-bootstrap/Container';

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
    
  }

  componentDidMount() {
    this.loadTasks();
  }

  render() {
    return (

      <Row >
        <Col xs={24} md={16} sm={8} className="tasks_list">
          <Row>
            <Col><p className="title">Por Fazer</p></Col>
            <Col><CreateTask loadTasks={this.loadTasks}/></Col>
          </Row>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done !== true)}/>
        </Col>
        <Col xs={24} md={16} sm={8} className="tasks_list">
          <p className="title">Concluídas</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done === true)}/>
        </Col>
      </Row>
    );
  }
}

export default Tasks;