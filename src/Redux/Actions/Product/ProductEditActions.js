import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {
    PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS
} from "../../Constants/Product/ProductEditConstants";
import {URL} from "../../Url";

export const editProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_EDIT_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`${URL}/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_EDIT_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_EDIT_FAIL, payload: message
        })
    }
}