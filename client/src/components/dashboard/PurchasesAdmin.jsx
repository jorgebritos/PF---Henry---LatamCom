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

    let totalIncome = () => {
        if (allPurchases.length > 0) {
            let total = 0;
            for (const p of allPurchases) {
                total += p.totalPrice;
            }
            return total
        }
    }

    return (
        <div>
            <h1>Total Income: ${totalIncome()} USD</h1>
            <h2>ALL USERS PURCHASES</h2>
            {
                allPurchases.length > 0 ? allPurchases.map((i) => {
                    return (
                        <div key={i.id}>
                            <p>User: {i.users[0].username}</p>
                            <h3>ITEMS:</h3>
                            <ul>
                                {i.products.map((p) => {
                                    return (
                                        <li key={p.id}>
                                            <img src={p.image} alt={`${p.name} image`}></img>
                                            <h4>{p.name}</h4>
                                            <h5>Unit Price: {p.price}</h5>
                                            <h6>{`Amount of Items Purchased: {p.amount} item(s)`}</h6>
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