import {USER_LOGOUT} from "../../Constants/User/UserLogoutConstants";
import {USER_LIST_RESET} from "../../Constants/User/UserListConstants";

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_LIST_RESET
    })
    document.location.href = "/login"
}