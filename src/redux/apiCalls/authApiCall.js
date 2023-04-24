import { authActions } from "redux/slices/authSlice"; 
import request from "utils/request";
import getUser from "utils/helper"; 
export const loginUser  = (user)=>{
    return async (dispatch) =>{
        try {
            const {data} = await request.post('/login',user);
            const userDecoded = getUser(data.token);
            console.log(userDecoded)
            dispatch(authActions.login(data));
            localStorage.setItem("userInfo",JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }
}
export const logout  = ()=>{
    return (dispatch) =>{
        try {
            dispatch(authActions.logout());
            localStorage.removeItem("userInfo");
        } catch (error) {
            console.log(error)
        }
    }
}