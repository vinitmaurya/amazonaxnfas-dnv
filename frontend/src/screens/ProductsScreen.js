import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';

function ProductsScreen(props) {

    const [modalVisible, setModelVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');
    const [size, setSize] = useState('');
    const [minOrder, setMinOrder] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;
    const productSave = useSelector(state => state.productSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
    } = productSave;
    const productDelete = useSelector(state => state.productDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModelVisible(false);
        }
        dispatch(listProducts());
        return () => {
            //
        };
    }, [successSave, successDelete]);


    const openModal = (product) => {
        setModelVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setDescription(product.description);
        setBrand(product.brand);
        setCategory(product.category);
        setGender(product.gender);
        setSize(product.size);
        setMinOrder(product.minOrder);
        setCountInStock(product.countInStock);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name, price, image, brand, category, countInStock, description, minOrder, gender, size
        }));
    }
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }
    return <div className="content content-margined">
        <div className="product-header">
            <h3>Products</h3>
            <button className='button primary' onClick={() => openModal({})}>Create Product</button>
        </div>
        {modalVisible &&
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Create Product</h2>
                        </li>
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                        </li>

                        <li>
                            <label htmlFor="name">
                                Name
               </label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="price">
                                Price
               </label>
                            <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="image">
                                Image
               </label>
                            <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="brand">
                                Brand
               </label>
                            <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="category">
                                Category
                                </label>
                            <select  onChange={(e) => { setCategory(e.target.value) }}>
                                <option value="">Please Select Category</option>
                                <option value="Shirts">Shirts</option>
                                <option value="Pents">Pents</option>
                                <option value="Innerwears">Inner Wears</option>
                                <option value="Shorts">Shorts</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="gender">
                                Select Gender
               </label>
                           <select onChange={(e) => { setGender(e.target.value) }}>
                               <option value="">Please Select Gender</option>
                               <option value="Male">Male</option>
                               <option value="Female">Female</option>
                           </select>
                        </li>
                        <li>
                            <label htmlFor="size">
                                Enter size
               </label>
                            <input type="text" name="size" id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="minOrder">
                                Minimum Order
               </label>
                            <input type="Number" name="minOrder" id="minOrder" value={minOrder} onChange={(e) => setMinOrder(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="countInStock">
                                Count In Stock
               </label>
                            <input type="Number" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="description">
                                Description
               </label>
                            <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}>
                            </textarea>
                        </li>
                        <li>
                            <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
                        </li>
                        <li>
                            <button type="button" onClick={() => setModelVisible(false)} className="button secondary">Go Back</button>
                        </li>
                    </ul>
                </form>

            </div>
        }

        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Gender</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.gender}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button className="button" onClick={() => openModal(product)}>Edit</button>
                                {' '}
                                <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    </div>

}
export default ProductsScreen;