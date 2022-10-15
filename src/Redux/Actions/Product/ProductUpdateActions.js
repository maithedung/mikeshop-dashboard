import {
    PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS
} from "../../Constants/Product/ProductUpdateConstants";
import {PRODUCT_EDIT_SUCCESS} from "../../Constants/Product/ProductEditConstants";
import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {URL} from "../../Url";

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                "Content-type": "application/json", "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`${URL}/api/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS, payload: data
        })
        dispatch({
            type: PRODUCT_EDIT_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_UPDATE_FAIL, payload: message
        })
    }
}