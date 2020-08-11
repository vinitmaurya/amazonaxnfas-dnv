import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [sortBrand, setSortBrand] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder, sortBrand))
  }
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder, sortBrand))
  }
  const sortBrandHandler = (e) => {
    setSortBrand(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder, sortBrand))
  }

  return <>
    {category &&
      <h2>{category}</h2>}

    <ul className="filter">
      <li>
        <form onSubmit={submitHandler}>
          <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </li>
      <li>
        Sort By: {' '}
        <select name="sortOrder" onChange={sortHandler}>
          <option value="">Newest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </li>
      <select name="sortBrand" onChange={sortBrandHandler}>
          <option value="">Select Brand</option>
          <option value="Nike">Nike</option>
          <option value="Puma">Puma</option>
          <option value="Sport">Sport</option>
        </select>
    </ul>
    {loading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <ul className="products">
          {
                          products.map(product =>
                            <li key={product._id}>
                                <div className="product">
                                    <Link to={'/product/' + product._id}>
                                        <img className="product-image" src={product.image} alt="product" />
                                    </Link>
                                    <div className="product-name">
                                        <Link to={'/product/' + product._id}>{product.name}</Link>
                                    </div>
                                    <div className="product-brand">{product.brand}</div>
                                    <div className="min-order">min order {product.minOrder}</div>
                                    <div className="product-size">Size: {product.size}</div>
                                    <div className="product-price">Rs.{product.price} <span className="unit">per unit</span></div>
                                    <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                                </div>
                            </li>)
          }
        </ul>
    }
  </>

}
export default HomeScreen;