import axios from "axios";
import {toast} from "react-toastify";
import {logout} from "./UserLogoutActions";
import {USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS} from "../../Constants/User/UserListConstants";
import {URL} from "../../Url";

export const listUser = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`${URL}/api/users`, config)

        dispatch({
            type: USER_LIST_SUCCESS, payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: USER_LIST_FAIL, payload: message
        })
    }
}