import React, { Component } from "react";
import bcrypt from 'bcryptjs';
import { Circles } from "react-loader-spinner";
import './index.css';

class RegisterForm extends Component {
  state = {
    userName: '',
    password: '',
    usersList: [],
    errorMsg:'',
    isLoading:true
  };

  componentDidMount() {
    const userLoginDetails = JSON.parse(localStorage.getItem('userLoginDetails'));
    if (userLoginDetails) {
      this.setState({ usersList: userLoginDetails.usersList });
    }
    setTimeout(()=>{
      this.setState({isLoading:false})},300)
  }

  componentDidUpdate(prevProps, prevState) {
    const { usersList } = this.state;
    if (prevState.usersList !== this.state.usersList) {
      localStorage.setItem("userLoginDetails", JSON.stringify( {usersList} ));
    }
  }

  onChangeUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  bcryptFun = async (password) => {
    return await bcrypt.hash(password, 5);
  };

  onRegister = async (event) => {
    event.preventDefault();
    const { userName, password,usersList } = this.state;
    const user = usersList.find(each=>each.userName === userName)
    if(user){
        this.setState({isError:true,errorMsg:'user name already exist'})
    }else{
      if(userName === '' || password === ''){
        this.setState({isError:true,errorMsg:`name & password can't be empty`})
      }else{
          this.setState({isError:false})
          try {
              const hashedPassword = await this.bcryptFun(password);
              this.setState(prevState => ({
                usersList: [...prevState.usersList, { userName, password: hashedPassword }]
              }), () => {
                this.props.history.replace('/login');
              });
          } catch (error) {
            console.log(error);
          }
        }
    }
  };

  onClickLogin = () => {
    this.props.history.replace('/login');
  };

  render() {
    const {isError,errorMsg,isLoading} = this.state
    return (
      <form onSubmit={this.onRegister} className="registerBgContainer">
        {isLoading ? <Circles color="skyblue"/> : 
        <>
          <h1>Welcome User</h1>
          <h2>Register Below</h2>
          <div className="regesterCard">
            <label htmlFor="userName" className="labelEle">Create User Name</label>
            <input onChange={this.onChangeUserName} className="inputEle" placeholder="Enter Name Here" id='userName' type="text" />
            <br />
            <label htmlFor="password" className="labelEle">Create password</label>
            <input autoComplete="off" onChange={this.onChangePassword} className="inputEle" placeholder="Enter Password Here" id="password" type="password" />
            {isError && <p>{errorMsg}</p>}
            <div>
              <button type="submit" className="registerBtn">Register</button>
              <button onClick={this.onClickLogin} type="button" className="registerBtn">Login</button>
            </div>
          </div>
        </>}
      </form>
    );
  }
}

export default RegisterForm;
