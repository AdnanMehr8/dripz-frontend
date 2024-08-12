import react from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Checkout from './Check';
import '../../styles/PlaceOrder.css'

const PlaceOrder = () => {
    const navigate = useNavigate();

    const idRandomGenerator = () => {
        let random = Math.floor(Math.random()*10);
        return random;
    }

    let randomNumber = '#' + idRandomGenerator() + idRandomGenerator() + idRandomGenerator() + idRandomGenerator() + idRandomGenerator() + idRandomGenerator() + idRandomGenerator();

    const backToHome = () => {
        navigate('/');
    }
    return (
        <div className='mt-5 mb-5'>
            <Checkout />
            <div className='place-container'>
            <h1 >📦</h1>
            <h3 className='text-center'>Thank you for your order!</h3>
            <p className='text-center'>
                Your order number is
                <strong>&nbsp; {randomNumber}</strong>. We have emailed your order
                confirmation and will update you once its shipped.
            </p>
            <button className='button' onClick={backToHome}>Back to Home</button>
        </div >
        </div>
    );
};

export default PlaceOrder;