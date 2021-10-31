import React, {useState,useEffect} from 'react'
import Producto from '../Components/Producto'
import {Link} from "react-router-dom"
import firebase from '../Config/firebase'

function DetallePage(props){
    const id = props.match.params.id
    
    const [producto,setProducto] = useState({})
    const [cargando, setCargando] = useState(true)
    const [comprar,setComprar] = useState("")
    
    const getProducto = async () => {
        try {
            setCargando(true)            
            const document = await firebase.db.collection("productos").doc(id).get()
            console.log("DOCUMENTO ", document.data())
            setProducto(document.data())
            setCargando(false)
            } catch (error) {
            console.log("Error", error)
        }

    }

    useEffect(
        () => {
            getProducto()
        }, []
    )

    if(cargando){
        return(
            <div>Cargando...</div>
        )
    }else{
        return(
            <div>
                <Producto datos={producto} verDetalle={false} modificar={false} eliminar={false}/>
                <button><Link to={"/"}>Volver</Link></button>
                <button onClick={()=>{setComprar("Gracias por su compra!!!!")}}>Comprar</button>
                <div>{comprar}</div>
            </div>
        )
    }
}

export default DetallePage;

