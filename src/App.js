import { Component } from "react";
import { Switch,Route,BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import './index.css'
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";

class App extends Component{

  render(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/register' component={RegisterForm}/>
                <Route exact path='/login' component={Login}/>
                <ProtectedRoute exact path='/home' component={Home}/>
            </Switch>
        </BrowserRouter>
    )
  }
}

export default App