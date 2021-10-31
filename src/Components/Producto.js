import React from 'react'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


function Producto(props){
const {datos} = props
const {name, price, id, description, stock, photo_url, sku} = datos
    
    
    const verDetalle = (props.verDetalle!==false?true:false)
    const modificar = (props.modificar!==false?true:false)
    const eliminar = (props.eliminar!==false?true:false)

    return(
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.datos.photo_url} alt="Imagen de producto" width="10%" height="10%"/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                {
                    verDetalle ?
                    <Button variant="primary" as={Link} to={"/detalle/"+id}>Ver detalle</Button>
                    :
                <div>
                    <div>{description}</div>
                    <div>{props.sku}</div>
                </div>
                }
                { 
                modificar &&
                    <Button variant="success" onClick={(e)=>props.clickModificar(datos)}>Modificar</Button>
                }
                { 
                eliminar &&
                    <Button variant="danger" onClick={(e)=>props.clickEliminar(datos)}>Eliminar</Button>
                }
                {
                verDetalle ?
                        <></>
                :
                <Card.Footer>
                    <small className="text-muted">Precio ${props.datos.price} Stock: {props.datos.stock}</small>
                </Card.Footer>                          
            }
            </Card.Body>
    </Card>
    )
}

export default Producto;

