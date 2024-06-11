import { Redirect, Route} from "react-router-dom"


const ProtectedRoute = (props)=>{
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    console.log(isLoggedIn)
    if(isLoggedIn === undefined || isLoggedIn === 'false'){
        return <Redirect to='/login'/>
    }return <Route {...props}/>
}

export default ProtectedRoute   