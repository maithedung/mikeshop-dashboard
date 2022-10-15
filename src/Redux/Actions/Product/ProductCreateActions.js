import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {
    PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS
} from "../../Constants/Product/ProductCreateConstants";
import {URL} from "../../Url";

export const createProduct = (name, price, description, image, countInStock) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(`${URL}/api/products`, {name, price, description, image, countInStock}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_CREATE_FAIL, payload: message
        })
    }
}