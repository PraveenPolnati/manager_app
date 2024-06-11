import { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from 'js-cookie'
import './index.css'
import letterM from '../../letterM.jpeg'
import { IoIosLogOut } from "react-icons/io";

class Navbar extends Component{

    onLogout = ()=>{
       Cookies.remove('user_cookie')
        this.props.history.replace('/login')
    }

    render(){
        return(
            <nav className="navBar">
                <div className="navCard1">
                    <img className="Mlogo" src={letterM} alt='letterM'/>
                    <h2>ManagerApp</h2>
                </div>
                <IoIosLogOut onClick={this.onLogout} className="logoutLogo"/>
                <button onClick={this.onLogout} className="logoutBtn" type="button">Logout</button>
            </nav>
        )
    }
}

export default withRouter(Navbar)