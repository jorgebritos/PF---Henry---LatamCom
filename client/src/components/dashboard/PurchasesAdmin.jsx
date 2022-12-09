import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllPurchases } from '../../redux/actions';
import { Link } from 'react-router-dom';
export default function PurchasesAdmin() {
    const dispatch = useDispatch();
    const allPurchases = useSelector((state) => state.purchasesAdmin);
    const allProducts = useSelector((state) => state.allProducts);
    const outOfStock = allProducts.length > 0 ? allProducts.filter((p) => p.stock === 0) : [];

    useEffect(() => {
        dispatch(getAllPurchases())
        dispatch(getAllProducts())
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
            <ul>
                {outOfStock.length > 0 ? (<h2>ITEMS OUT OF STOCK</h2>,
                    outOfStock.map((p) => {
                        return (
                            <Link to={'/update'} key={p.id}>
                                <li>
                                    <img src={p.image} alt={`${p.name} image`}></img>
                                    <h4>{p.name}</h4>
                                    <h3>OUT OF STOCK</h3>
                                </li>
                            </Link>
                        )
                    })) : outOfStock === 0 ? <li>Currently, All Items have Stock</li>
                    : <li>Currently, your shop has no items</li>}
            </ul>

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
                                            <h6>{`Amount of Items Purchased: ${p.amount} item(s)`}</h6>
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