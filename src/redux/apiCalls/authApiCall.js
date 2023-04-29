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
            //Set the error inside the localStorage (errMessage)
            localStorage.setItem('errMessage', error.response.data.error);
            // Set a timeout to remove the value after a specific amount of time
            setTimeout(() => {
              localStorage.removeItem('errMessage');
            }, 1 * 1000);
            // localStorage.removeItem('tries')
            if(localStorage.getItem('tries') || localStorage.setItem('tries',1)){
                const count = localStorage.getItem('tries')
                let myNumber = parseInt(count, 10);
                myNumber++;
                localStorage.setItem('tries',myNumber)
            }
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