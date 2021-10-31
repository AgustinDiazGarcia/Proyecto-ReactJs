import React, {useState,useEffect} from 'react'
import Producto from '../Components/Producto'
import firebase from '../Config/firebase';
import {CardColumns, Spinner, Button} from 'react-bootstrap'


function HomePage(){
    const [cargando,setCargando] = useState(true);
    const [productos,setProductos] = useState([]);
    const getProductos = async ()=>{
        try{
            setCargando(true)
            const querySnapshot = await firebase.db.collection("productos")
            .get()
            setProductos(querySnapshot.docs)
            setCargando(false)
        }catch(e){
            console.log("ERROR",e)
        }
    
    }
    useEffect(
        ()=>{
            
            getProductos()
        },
        []
    )

    if(cargando){
        return(
            <div>
                <Button variant="primary" disabled>
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    <span className="sr-only">Loading...</span>
                </Button>{' '}
                <Button variant="primary" disabled>
                    <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    Cargando...
                </Button>
            </div>
        )
    }else{
        return(
            <div>
                <h2 className= "animate__animated animate__backInRight text-center" >PRODUCTOS</h2>
            <CardColumns className= "animate__animated animate__lightSpeedInLeft">
                {productos.map(producto=><Producto datos={{...producto.data(), id:producto.id}} verDetalle={true} modificar={false} eliminar={false}/>)}
            </CardColumns>
            </div>
        )
    }

}

export default HomePage;
