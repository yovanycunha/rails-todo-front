import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const _HEROKU_URL = `https://murmuring-citadel-83821.herokuapp.com/tasks`;
class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title: '',
            done: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.handleInputValidation = this.handleInputValidation.bind(this);
    }

    validLength = (input) => {
        const arrayOfInputs = input.split(" ");
        const removeWhiteSpaces = arrayOfInputs.filter((c)=>c!=="");
        return removeWhiteSpaces.length > 0;
    }

    handleInputValidation = () => {
        const validLength = this.validLength(this.state.title);
        return validLength;
    }
    

    handleSubmit = async (event) => {
        
        const isValid = this.handleInputValidation();
        if (isValid) {
            await fetch(_HEROKU_URL, 
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        task: {title: this.state.title, done:false}
                    })
                })
                this.props.loadTasks();
                this.clearInput();
            }
            
    }


    clearInput = () => {
        this.setState({
            title: "",
        })
    }
    

    handleInputChange = (event) => {
        let value = event.target.value;
        this.setState({
            title: value
        });

    }
    render() {
        return (
            <div>
                <Form inline className="justify-content-end">
                    <InputGroup className="create_task_input">
                        <FormControl
                            name="newTask"
                            type="email"
                            placeholder="Nova Atividade ..."
                            value={this.state.title}
                            onChange={this.handleInputChange}
                        />
                    </InputGroup>
                    {
                        this.handleInputValidation() ? (
                            <Button  onClick={this.handleSubmit} variant="dark" className="create_task_btn">
                                <FontAwesomeIcon icon="plus-circle"/>
                            </Button>
                        ) : (
                            <Button disabled onClick={this.handleSubmit} variant="dark" className="create_task_btn">
                                <FontAwesomeIcon icon="plus-circle"/>
                            </Button>
                        )
                    }
                </Form>
            </div>
        );
        }
}

export default CreateTask;