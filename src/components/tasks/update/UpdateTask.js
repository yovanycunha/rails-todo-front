import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormCheck from 'react-bootstrap/FormCheck';

class UpdateTask extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title: '',
            done: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit = async () => {
        const isValid = this.handleInputValidation();
        
        if (isValid) {
            await fetch(`https://murmuring-citadel-83821.herokuapp.com/tasks/${this.props.task.id}`, 
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task: {title: this.state.title, done: this.state.done}
                })
            })
            this.props.loadTasks(); 
            this.clearInput();
        }
    }

    clearInput = () => {
        this.setState({
            title: '',
            done: false
        })
    }
    

    handleInputChange = (event) => {
        let value = event.target.value;
        this.setState({
            title: value,
        });
    }

    handleCheckboxChange = (event) => {
        let done = event.target.checked;
        this.setState({
            done: done
        });
    }
    
    render() {
        return (
            <div>
                <Form inline className="justify-content-between update-field">
                    <InputGroup className="update_task_title">
                        <FormControl
                            type="email"
                            placeholder="Novo título "
                            onChange={this.handleInputChange}
                            value={this.state.title}
                        />
                    </InputGroup>
                    <InputGroup>
                        <FormCheck
                            label="Está Concluída"
                            onChange={this.handleCheckboxChange}
                            checked={this.state.done}
                        />
                    </InputGroup>
                    
                    {
                        this.handleInputValidation() ? (
                            <Button onClick={this.handleSubmit} variant="dark" className="update_task_btn">
                                <FontAwesomeIcon icon="redo-alt"/> Atualizar
                            </Button>
                        ) : (
                            <Button disabled onClick={this.handleSubmit} variant="dark" className="update_task_btn">
                                <FontAwesomeIcon icon="redo-alt"/> Atualizar
                            </Button>
                        )
                    }
                    
                </Form>
            </div>
        );
        }
}

export default UpdateTask;