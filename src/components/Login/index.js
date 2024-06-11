import { Component } from "react";
import bcrypt from 'bcryptjs'
import {Circles} from 'react-loader-spinner'
import './index.css'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class Login extends Component{

    state = {loginUserName:'',loginPassword:'',errorMsg:'',isError:false,usersList:[],isLoading:true,isLoggedIn:false}

    componentDidMount(){
        const userLoginDetails = JSON.parse(localStorage.getItem('userLoginDetails'))
        if(userLoginDetails){
            const {usersList} = userLoginDetails
            this.setState({usersList})
        }
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if(isLoggedIn){
            this.setState({isLoggedIn})
        }
        setTimeout(
            ()=>{
                this.setState({isLoading:false})
            },
        100)
    }

    onChangeUserName = (event)=>{
        this.setState({loginUserName:event.target.value})
    }

    onChangePassword = (event)=>{
        this.setState({loginPassword:event.target.value})
    }

    onClickRegister = ()=>{
        this.props.history.replace('/register')
    }

    onLogin = async (event) => {
    event.preventDefault();

    const { loginUserName, loginPassword, usersList} = this.state;

    const user = usersList.find(each => each.userName === loginUserName);

    if (user) {
        const isPasswordMatch = await bcrypt.compare(loginPassword, user.password);
        this.setState({isError:false,errorMsg:''})

        if (isPasswordMatch) {
            this.setState({ errorMsg: '', isError: false });
            localStorage.setItem('isLoggedIn',true)
            this.props.history.replace('/');
        } else {
            this.setState({ errorMsg: 'Password incorrect', isError: true });
        }
    } else {
        this.setState({ errorMsg: 'Username incorrect', isError: true });
    }
};

    render(){
        const{loginPassword,errorMsg,isError,isLoading,isLoggedIn} = this.state
        if(isLoggedIn==='true'){
            return <Redirect to='/'/>
        }
        return(
            <form onSubmit={this.onLogin} className="loginBgContainer">
                {isLoading ? <Circles color="skyblue"/> : <>
                <h1>Welcome Back User</h1>
                <h2>Login Below</h2>
                <div className="loginCard">
                    <label id='1' className="labelEle" htmlFor="loginUserName">User Name</label>
                    <input placeholder="Enter Name" onChange={this.onChangeUserName} className="inputEle" id='labelEle' type="text"/>
                    <br/>
                    <label id='2' className="labelEle" htmlFor="loginPassword">Password</label>
                    <input autoComplete={loginPassword}  placeholder="Enter Password" onChange={this.onChangePassword} className="inputEle" id='className="labelEle' type="password"/>
                    <br/>
                    {isError && <p>{errorMsg}</p>}
                    <div>
                        <button type="submit" className="loginBtn">Login</button>
                        <button  onClick={this.onClickRegister} type="button" className="loginBtn">Register</button>
                    </div>
                </div> </>}
            </form>
        )
    }
}

export default Login