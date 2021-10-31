import React from "react";
import {Link} from "react-router-dom";
import {Navbar,Nav,NavDropdown} from "react-bootstrap";
import EcommerceAd from "../Context/EcommerceAd";

function Menu(){
    return(
    <EcommerceAd.Consumer>
    {context=>
    <Navbar bg="primary" variant="dark" expand="lg"style={{ position: "sticky" }} fixed="top">
    <Navbar.Brand as={Link} to="/">ADIAZ S.A</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
        <Nav.Link as={Link}to={"/"}>Home</Nav.Link>
        {
                context.userLogin &&
                <>
                <Nav.Link as={Link} to="/catalogo">ABM</Nav.Link>
                </>
            }
            {
                !context.userLogin &&
                <>
                <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>
            }
            {
            context.userInfo &&
            <>    
            <Nav.Link onClick={context.logoutUser} as={Link} to={"/"}> Logout </Nav.Link>
            <Nav.Link > Hola {context.userInfo.nombre}</Nav.Link>
            </>
            }
    </Nav>
    </Navbar.Collapse>
    </Navbar> 
    }
     </EcommerceAd.Consumer>   
    );
}
export default Menu;