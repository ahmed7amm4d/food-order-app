import React, { useContext, useEffect, useState } from "react";

import CartContext from '../../store/cart-context';
import classes from './CartButton.module.css'
import { FaShoppingCart } from "react-icons/fa";

const CartButton = (props) => {
    const [btnAnimation, setBtnAnimation] = useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numOfCartItems = items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnAnimation ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0 ) {
            return;
        }
        setBtnAnimation(true);
        const timer = setTimeout(() => {
            setBtnAnimation(false);
        },300);
        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <FaShoppingCart style={{ width: '1.1rem', height: '1.1rem' }} />
            </span>
            <span className={classes.text}>Your Cart</span>
            <span className={classes.badge}>{numOfCartItems}</span>
        </button>
    );
};

export default CartButton;