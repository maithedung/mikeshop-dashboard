import axios from "axios";
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "../../Constants/User/UserLoginConstants";
import {toast} from "react-toastify";
import {logout} from "./UserLogoutActions";
import {URL} from "../../Url";

export const login = (email, password) => async (dispatch) => {
    const toastObject = {
        pauseOnFocusLoss: false, draggable: false, pauseOnExit: false, autoClose: 2000
    }
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.post(`${URL}/api/users/login`, {email, password}, config)

        if (!data.isAdmin === true) {
            toast.error("You are not Admin", toastObject)
            dispatch({
                type: USER_LOGIN_FAIL
            })
        } else {
            dispatch({
                type: USER_LOGIN_SUCCESS, payload: data
            })
        }

        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: USER_LOGIN_FAIL, payload: message
        })
    }
}
