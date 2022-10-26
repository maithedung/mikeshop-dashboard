import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import OrderDetailMain from "../components/Orders/OrderDetailMain";

const OrderDetailScreen = ({match}) => {
    const orderId = match.params.id

    return (<>
        <Sidebar/>
        <main className="main-wrap">
            <Header/>
            <OrderDetailMain orderId={orderId}/>
        </main>
    </>);
};

export default OrderDetailScreen;
