import {
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS
} from "../../Constants/Product/ProductListConstants";
import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {URL} from "../../Url";

export const listProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`${URL}/api/products/all`, config)

        dispatch({
            type: PRODUCT_LIST_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_LIST_FAIL, payload: message
        })
    }
}