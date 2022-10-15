import {
    ORDER_DELIVERED_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_RESET, ORDER_DELIVERED_SUCCESS
} from "../../Constants/Order/OrderDeliveredConstants";

export const orderDeliveredReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVERED_REQUEST:
            return {
                loading: true
            }
        case ORDER_DELIVERED_SUCCESS:
            return {
                loading: false, success: true
            }
        case ORDER_DELIVERED_FAIL:
            return {
                loading: false, error: action.payload
            }
        case ORDER_DELIVERED_RESET:
            return {}
        default:
            return state
    }
}