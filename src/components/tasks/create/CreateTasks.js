import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const _HEROKU_URL = `https://murmuring-citadel-83821.herokuapp.com/tasks`;


function CreateTask(props) {
    const [title, setTitle] = useState('');
    const [show, setShow] = useState('');

    const handleSubmit = (async ()=> {
        await fetch(_HEROKU_URL, 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: {title: title, done: false}
            })
        })
        setShow(false);
        setTitle('');
        props.loadTasks();
    });

    return (
        <div>
         <Button onClick={e => setShow(true)} variant="dark" className="float-right create_task_btn">+ Add Atividade</Button>
   
         <Modal show={show || false} onHide={e => setShow(false)}>
           <Modal.Header closeButton>
             <Modal.Title>Adicionar Item</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Form.Control type="email" placeholder="Informe a atividade ...." value={title || ''} onChange={e => setTitle(e.target.value)} />
           </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={e => setShow(false)}>
               Fechar
             </Button>
             <form onSubmit={handleSubmit}>
               <Button variant="dark" type="submit">
                 Adicionar
               </Button>
             </form>
           </Modal.Footer>
         </Modal>
       </div>

    )
};

export default CreateTask;