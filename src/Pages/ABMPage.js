import React, {useState,useEffect} from 'react'
import firebase from '../Config/firebase'
import Producto from '../Components/Producto'
import {CardColumns, Spinner, Button, Form} from 'react-bootstrap'
import FormGroup from '../Components/Forms/FormGroup';
import {storage} from "../Config/firebase"

function ABMPage(){
    const [cargando,setCargando] = useState(true);
    const [productoForm, setProductoForm] = useState({id:null,name:"",price:"",description:"",sku:"",photo_url:"",stock:""})
    const [productos,setProductos] = useState ([])
    const [reload, setReload] = useState (false)
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChangeImagen = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        };
    
        const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progress);
            },
            error => {
              console.log(error);
            },
            () => {
              storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                  setUrl(url);
                });
            }
          );
        };
      
        console.log("images:", image);

    const handleSubmit = async (event) =>{
        event.preventDefault()
        try{
            let document = null
            if(productoForm.id===null){
                document = await firebase.db.collection("productos")
                .add({
                    name:productoForm.name,
                    price:productoForm.price,
                    description:productoForm.description,
                    stock:productoForm.stock,
                    sku:productoForm.sku,
                    photo_url:url
                })
            }else{
                if (url!==""){
                document = await firebase.db.doc("productos/"+productoForm.id)
                .set ({
                    id:null,
                    name: productoForm.name,
                    price:productoForm.price,
                    description:productoForm.description,
                    stock:productoForm.stock,
                    sku:productoForm.sku,
                    photo_url:url
                })                
            }else{
                document = await firebase.db.doc("productos/"+productoForm.id)
                .set(productoForm)
            }
        }
            setProductoForm ({id:null,name:"",price:"",description:"",sku:"",photo_url:"",stock:""})
            console.log("Document",document)
            setReload(true)
            setUrl("")
            setProgress(0)
        }catch(e){
            console.log("error",e)
        }
        
}
const getProductos = async ()=>{
    try{
        setCargando(true)
    const querySnapshot = await firebase.db.collection("productos")
    .get()
    setProductos(querySnapshot.docs)
    setCargando(false)
    setReload(false)
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
useEffect(
    ()=>{
        if(reload)
        getProductos()
    },
    [reload]
)

const handleChange = (event)=>{
    const name = event.target.name
    const value = event.target.value
    setProductoForm({...productoForm,[name]:value})
}
const handleClickModificar = (producto)=>{
    setProductoForm(producto)
}

const handleClickEliminar = async (producto)=>{
    try{
    const document = await firebase.db.doc("productos/"+producto.id)
    .delete()
    setReload(true)
}catch(e){
    console.log("error",e)

}
}

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
                <h1>Alta de Producto</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup label="Nombre" name="name" type="text" placeholder="Nombre del producto" value={productoForm.name} onChange={handleChange}/> 
                    <FormGroup label="Descripción" name="description" placeholder="Descripción del producto" value={productoForm.description} onChange={handleChange}/> 
                    <FormGroup label="Precio" name="price" type="number" placeholder="Precio de venta" value={productoForm.price} onChange={handleChange}/> 
                    <FormGroup label="SKU" name="sku" type="text" placeholder="Código de identificación"value={productoForm.sku} onChange={handleChange}/> 
                    <FormGroup label="Stock" name="stock" type="number" placeholder="Stock del producto" value={productoForm.stock} onChange={handleChange}/> 
                    <FormGroup label="Direccion URL imagen ilustrativa" name="photo_url" type="text" placeholder="Direccion web que aloja su imagen" value={productoForm.photo_url} onChange={handleChange}/> 
                    <Form.Control type="file" size="lg"onChange={handleChangeImagen} />
                    <progress value={progress} max="100" />
                    <img width= "50px" src={url|| "http://via.placeholder.com/1/FFFFFF/FFFFFF"} alt="firebase-image"/>
                    <br/>
                    <Button size="md" onClick={handleUpload}>Subir Imagen</Button>
                    <Button type="submit" variant="dark" size="md">Guardar</Button>  
                </form>
                <h1>Listado de Productos</h1> 
                <CardColumns>
                    {productos.map(producto=><Producto datos={{...producto.data(), id:producto.id}} verDetalle={false} modificar={true} clickModificar={handleClickModificar} eliminar={true} clickEliminar={handleClickEliminar}/>)}
                </CardColumns>
            </div>
        )
    }

}

export default ABMPage;