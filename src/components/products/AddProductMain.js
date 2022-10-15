import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import toast from "../LoadingError/Toast";
import {PRODUCT_CREATE_RESET} from "../../Redux/Constants/Product/ProductCreateConstants";
import {createProduct} from "../../Redux/Actions/Product/ProductCreateActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const AddProductMain = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [countInStock, setCountInStock] = useState(0)

    const productCreate = useSelector((state) => state.productCreate)
    const {loading, error, product} = productCreate

    const toastObject = {
        pauseOnFocusLoss: false, draggable: false, pauseOnExit: false, autoClose: 2000
    }

    useEffect(() => {
        if (product) {
            toast.success("Product added", toastObject)
            dispatch({type: PRODUCT_CREATE_RESET})
            setName("")
            setPrice(0)
            setImage("")
            setDescription("")
            setCountInStock(0)
        }
    }, [dispatch, product])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct(name, price, description, image, countInStock))
    }

    return (<>
        <Toast/>
        <section className="content-main" style={{maxWidth: "1200px"}}>
            <form onSubmit={submitHandler}>
                <div className="content-header">
                    <Link to="/products" className="btn btn-danger text-white">
                        Go to products
                    </Link>
                    <h2 className="content-title">Add product</h2>
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
                                {error && <Message variant="alert-danger">{error}</Message>}
                                {loading && <Loading/>}
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
                                    <label htmlFor="product_description" className="form-label">Description</label>
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
                                    <input className="form-control mt-3" type="file"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </>);
};

export default AddProductMain;
