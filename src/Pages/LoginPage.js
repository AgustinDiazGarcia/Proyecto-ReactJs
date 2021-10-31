import firebase from "../Config/firebase";
import React, {useContext, useState} from "react";
import {Button} from "react-bootstrap";
import FormGroupad from "../Components/Forms/FormGroupad";
import EcommerceAd from "../Context/EcommerceAd";
import {useForm} from "react-hook-form"
import {useHistory} from "react-router-dom"
import {Link} from "react-router-dom"


function LoginPage (){
    const history = useHistory()
    const {register,handleSubmit,formState:{errors}}= useForm({mode:"onChange"})
    const context = useContext(EcommerceAd)
    const [form,setForm] = useState({email:"",password:""})
    const [Cargando,setCargando] = useState(false);
    const onSubmit = async (data)=>{
        setCargando(true)

        try{
            const responseUser = await firebase.auth.signInWithEmailAndPassword(data.email,data.password)
            console.log(responseUser)
            setCargando(false)
            const userInfo = await firebase.db.collection("Usuarios")
                .where("userId","==",responseUser.user.uid)
                .get()
            context.loginUser(userInfo.docs[0]?.data())
            history.push("/") 
                   
            }catch(e){
                console.log("error",e)
                setCargando(false)
                //setAlert({variant:"danger", text:"El password o Usuario es incorrecto"})
                //alert(e.message)
                if(e.code=="auth/weak-password","auth/user-not-found"){    
                    //alert("El password o Usuario es incorrecto")
                }
            }
        }
    /* const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setForm({...form,[name]:value})

    }*/

    return(
        <div>
            <form onSubmit={handleSubmit (onSubmit)}>
            <FormGroupad label="Email" name="email" type="email" placeholder="@Mail@" register={{...register("email",{required:true,minLenght:3})}} /> 
                {errors.email?.type==="required" && <p >El campo es Obligatorio</p>}
            <FormGroupad label="Password" name="password" type="password" placeholder="Contraseña" register={{...register("password",{required:true,minLength:6})}} /> 
                {errors.password?.type==="required" && <p >El campo es Obligatorio</p>}
                {errors.password?.type==="minLength" && <p>Minimo 6 caracteres</p>}
            <Button variant="primary" size="lg" type="submit" Cargando={Cargando}>Ingresar</Button>
            </form>
        </div>
        
    )   
}
export default LoginPage;