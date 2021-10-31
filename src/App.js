import {BrowserRouter,Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import DetallePage from './Pages/DetallePage';
import Menu from './Components/Menu';
import RegistroPage from './Pages/RegistroPage';
import LoginPage from './Pages/LoginPage';
import ABMPage from './Pages/ABMPage';
import {Container} from "react-bootstrap";
import "animate.css/animate.min.css";
import "./App.css";
import GlobalState from "./Context/GlobalState";

function App() {
  return (
    <GlobalState>
    <BrowserRouter>
      <Menu />
      <Container fluid>
        <Route path="/" exact component={HomePage} />
        <Route path="/detalle/:id" exact component={DetallePage} />
        <Route path="/registro" exact component={RegistroPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/catalogo" exact component={ABMPage} />
      </Container>
    </BrowserRouter>
    </GlobalState>
  );
}

export default App;
