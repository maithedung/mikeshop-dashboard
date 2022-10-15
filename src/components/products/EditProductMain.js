import React, {useEffect, useState} from "react";
import Toast from "./../LoadingError/Toast";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {editProduct} from "../../Redux/Actions/Product/ProductEditActions";
import {PRODUCT_UPDATE_RESET} from "../../Redux/Constants/Product/ProductUpdateConstants";
import {toast} from "react-toastify";
import {createProduct} from "../../Redux/Actions/Product/ProductCreateActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import {updateProduct} from "../../Redux/Actions/Product/ProductUpdateActions";

const EditProductMain = (props) => {
    const {productId} = props;
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [countInStock, setCountInStock] = useState(0)

    const productEdit = useSelector((state) => state.productEdit)
    const {loading, error, product} = productEdit
    const productUpdate = useSelector((state) => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

    const toastObject = {
        pauseOnFocusLoss: false, draggable: false, pauseOnExit: false, autoClose: 2000
    }

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            toast.success("Product updated", toastObject)
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(editProduct(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setDescription(product.description)
                setCountInStock(product.countInStock)
            }
        }
    }, [dispatch, product, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({_id: productId, name, price, description, image, countInStock}))
    }

    return (<>
        <Toast/>
        <section className="content-main" style={{maxWidth: "1200px"}}>
            <form onSubmit={submitHandler}>
                <div className="content-header">
                    <Link to="/products" className="btn btn-danger text-white">
                        Go to products
                    </Link>
                    <h2 className="content-title">Update Product</h2>
                    <div>
                        <button type="submit" className="btn btn-primary">
                            Publish now
                        </button>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-xl-8 col-lg-8">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                {errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
                                {loadingUpdate && <Loading/>}
                                {loading ? <Loading/> : error ?
                                    <Message variant="alert-danger">{errorUpdate}</Message> : (<>
                                        <div className="mb-4">
                                            <label htmlFor="product_title" className="form-label">
                                                Product title
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Type here"
                                                className="form-control"
                                                id="product_title"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_price" className="form-label">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Type here"
                                                className="form-control"
                                                id="product_price"
                                                required
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_count_in_stock" className="form-label">
                                                Count In Stock
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Type here"
                                                className="form-control"
                                                id="product_count_in_stock"
                                                required
                                                value={countInStock}
                                                onChange={(e) => setCountInStock(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_description"
                                                   className="form-label">Description</label>
                                            <textarea
                                                placeholder="Type here"
                                                className="form-control"
                                                rows="7"
                                                id="product_description"
                                                required
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="product_image" className="form-label">Images</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Inter Image URL"
                                                id="product_image"
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                            />
                                        </div>
                                    </>)}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </>);
};

export default EditProductMain;
