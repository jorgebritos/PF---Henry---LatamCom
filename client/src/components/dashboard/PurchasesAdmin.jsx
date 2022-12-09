import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPurchases } from '../../redux/actions';
export default function PurchasesAdmin() {
    const dispatch = useDispatch();
    const allPurchases = useSelector((state) => state.purchasesAdmin);

    useEffect(() => {
        dispatch(getAllPurchases())
    }, [])

    return (
        <div>
            <h1>ALL USERS PURCHASES</h1>
            {
                allPurchases.length > 0 ? allPurchases.map((i) => {
                    return (
                        <div key={i.id}>
                            <p>User: {i.users[0].username}</p>
                            <h2>ITEMS:</h2>
                            <ul>
                                {i.products.map((p) => {
                                    return (
                                        <li key={p.id}>
                                            <img src={p.image} alt={`${p.name} image`}></img>
                                            <h3>{p.name}</h3>
                                            <h4>Unit Price: {p.price}</h4>
                                            <h5>{`Amount of Items Purchased: {p.amount} item(s)`}</h5>
                                        </li>
                                    )
                                })}
                            </ul>
                            <h3>Total Price: ${i.totalPrice} USD</h3>
                        </div>
                    )
                })
                    : ""
            }
        </div>
    )
}