
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../component/CheckoutSteps';

function ShippingScreen(props) {

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [mobile, setMobile] = useState('');

    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ address, city, postalCode, mobile }));
        props.history.push('payment');
    }
    return <div>
        <CheckoutSteps step1 step2 ></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Shipping</h2>
                    </li>
                    <li>
                        <label htmlFor="address">
                            Address
                </label>
                        <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="mobile">
                            Mobile no.
                        </label>
                        <input type="number" name="mobile" id="mobile" min="10" max="10" onChange={(e) => setMobile(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="city">
                            City
                             </label>
                        <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="postalCode">
                            Postal Code
                </label>
                        <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>
                </ul>
            </form>

        </div>

    </div>
}
export default ShippingScreen;