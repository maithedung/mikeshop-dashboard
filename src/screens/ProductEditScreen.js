import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import EditProductMain from "../components/Products/EditProductMain";

const ProductEditScreen = ({ match }) => {
  const productId = match.params.id;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain productId={productId} />
      </main>
    </>
  );
};
export default ProductEditScreen;
