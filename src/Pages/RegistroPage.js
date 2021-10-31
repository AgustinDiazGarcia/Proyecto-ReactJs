import React, {useState} from "react";
import firebase from '../Config/firebase';
import Button from 'react-bootstrap/Button'
import FormGroupad from '../Components/Forms/FormGroupad';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom"


function RegistroPage (){
    const [form,setForm] = useState({nombre:'',apellido:'',email:'',password:'',telefono:'',confpass:''})
    const {register,handleSubmit,formState:{errors}}= useForm({mode:"onChange"})
    const history = useHistory ()
    const onSubmit = async (data)=>{
        try{
            const responseUser = await firebase.autenticacion.createUserWithEmailAndPassword(data.email,data.password)
            console.log("User",responseUser)
            const document = await firebase.db.collection("Usuarios")
            .add({
                nombre:data.nombre,
                apellido:data.apellido,
                telefono:data.telefono,
                userId:responseUser.user.uid

            })
            console.log("document",document)
            history.push("/")
        }catch(e){
            console.log("Error",e)
                if(e.code=="auth/weak-password"){
                alert("El password debe tener al menos 6 caracteres")
            }
        }
    /*const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setForm({...form,[name]:value})*/
    }
    return(
        <div>
            <form onSubmit={handleSubmit (onSubmit)}>
                <FormGroupad label="Nombre" name="nombre" type="text" placeholder="Nombre" register={{...register("nombre",{required:true,minLength:3})}}/>
                   {errors.nombre?.type==="required" && <p >El campo es Obligatorio</p>}
                   {errors.nombre?.type==="minLength" && <p>  Debe Completar al menos 3 Carasteres</p>} 
                <FormGroupad label="Apellido" name="apellido" type="text" placeholder="Apellido" register={{...register("apellido",{required:true,minLength:3})}}/> 
                   {errors.apellido?.type==="required" && <p >El campo es Obligatorio</p>}
                <FormGroupad label="Email" name="email" type="email" placeholder="@Mail@" register={{...register("email",{required:true,minLength:3})}}/> 
                   {errors.email?.type==="required" && <p >El campo es Obligatorio</p>}
                <FormGroupad label="Telefono" name="telefono" type="number" placeholder="Numero Telefonico" register={{...register("telefono",{required:true,minLength:3})}}/> 
                {errors.telefono?.type==="required" && <p >El campo es Obligatorio</p>}
                <FormGroupad label="Password" name="password" type="password" placeholder="Contraseña" register={{...register("password",{required:true,minLength:6})}}/> 
                   {errors.password?.type==="required" && <p >El campo es Obligatorio</p>}
                   {errors.password?.type==="minLength" && <p>  Debe Completar al menos 6 Carasteres</p>}
                <FormGroupad label="Confirmacion" name="confpass" type="password" placeholder="Repita su Contraseña" register={{...register("confpass",{required:true,minLength:3})}}/> 
                   {errors.confpass?.type==="required" && <p >El campo es Obligatorio</p>}
                <Button variant="primary" size="lg" block type="submit">Crear Cuenta</Button>
            </form>
        </div>
    )
}
export default RegistroPage;