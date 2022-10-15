import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {
    PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS
} from "../../Constants/Product/ProductDeleteConstants";
import {URL} from "../../Url";

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`${URL}/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_DELETE_FAIL, payload: message
        })
    }
}