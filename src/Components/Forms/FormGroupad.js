import React from "react";
import {Form} from 'react-bootstrap'
function FormGroupad(props){
    return(
        <Form.Group controlId={"formBasic"+props.name}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} placeholder={props.placeholder} name={props.name} {...props.register}/>
            
        </Form.Group>
    )
}

export default FormGroupad;