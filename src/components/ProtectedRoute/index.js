import { Redirect, Route} from "react-router-dom"
import Cookies from 'js-cookie'


const ProtectedRoute = (props)=>{
    const cookie = Cookies.get('user_cookie')
    console.log(cookie)
    if(cookie === undefined){
        return <Redirect to='/login'/>
    }return <Route {...props}/>
}

export default ProtectedRoute   