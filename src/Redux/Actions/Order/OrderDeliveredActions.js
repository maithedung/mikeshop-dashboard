import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {
    ORDER_DELIVERED_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS
} from "../../Constants/Order/OrderDeliveredConstants";
import {URL} from "../../Url";

export const deliveredOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVERED_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`${URL}/api/orders/${order._id}/delivered`, {}, config)
        dispatch({
            type: ORDER_DELIVERED_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DELIVERED_FAIL, payload: message
        })
    }
}