
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, [])
    const handleAddToCart= () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }
    return <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        {loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                (
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt="products"></img>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    {product.rating} Stars ({product.numReviews} Reviews)
                                </li>
                                <li>
                                    <i>min order {product.minOrder}</i>
                                </li>
                                <li>
                                    Price:  <b>Rs.{product.price}</b> per unit
                                </li>
                                <li>
                                    Description:
                        <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='details-action'>
                            <ul>
                                <li>
                                    Min Order: {product.minOrder}
                                </li>
                                <li>
                                    Price: {product.price} per unit
                                </li>
                                <li>
                                    Status: {product.countInStock > product.minOrder ? " In Stock" : "Out of Stock"}
                                </li>
                                <li>
                                    Qty: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                        {[...Array(product.countInStock).keys()].map(x =>
                                            <option key={x + 1} value={x + 2}>{x + 2}</option>)}
                                    </select>
                                </li>
                                <li>
                                    {product.countInStock > product.minOrder && <button onClick={handleAddToCart} className='button primary'>Add to Cart</button>}
                                </li>
                            </ul>

                        </div>
                    </div>
                )}

    </div>
}
export default ProductScreen;