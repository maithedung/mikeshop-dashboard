import {
    PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS
} from "../../Constants/Product/ProductEditConstants";

export const productEditReducer = (state = {product: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_REQUEST:
            return {
                ...state, loading: true
            }
        case PRODUCT_EDIT_SUCCESS:
            return {
                loading: false, product: action.payload
            }
        case PRODUCT_EDIT_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}