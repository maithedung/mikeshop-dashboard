import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {userLoginReducer} from "./Reducers/User/UserLoginReducers";
import {userLogoutReducer} from "./Reducers/User/UserLogoutReducers";
import {userListReducer} from "./Reducers/User/UserListReducers";
import {productListReducer} from "./Reducers/Product/ProductListReducers";
import {productDeleteReducer} from "./Reducers/Product/ProductDeleteReducers";
import {productCreateReducer} from "./Reducers/Product/ProductCreateReducers";
import {productDetailReducer} from "./Reducers/Product/ProductDetailReducers";
import {productEditReducer} from "./Reducers/Product/ProductEditReducers";
import {productUpdateReducer} from "./Reducers/Product/ProductUpdateReducers";
import {orderListReducer} from "./Reducers/Order/OrderListReducers";
import {orderDetailReducer} from "./Reducers/Order/OderDetailReducers";
import {orderDeliveredReducer} from "./Reducers/Order/OrderDeliveredReducers";


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userLogout: userLogoutReducer,
    userList: userListReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDetail: orderDetailReducer,
    orderDelivered: orderDeliveredReducer
})

// LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    userLogin: {
        userInfo: userInfoFromLocalStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store