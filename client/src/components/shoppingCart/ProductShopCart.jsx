import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';

const ProductShopCart = () => {



    
    const [total, setTotal] = useState(0)
    const [productsSelected, setProductsSelected] = useState([])
    let cant = 0

    useEffect(() => {

        seeProducts()


    }, [])

    const seeProducts = () => {
        let cart = []

        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        setProductsSelected(cart)
        let cant = cart
        totalAccount(cant)
    }

    const deleteProduct = (e, id) => {
        e.preventDefault()
        let carrito = productsSelected.filter((p) => p.id !== id)
        setProductsSelected(carrito)

        localStorage.setItem("cart", JSON.stringify(carrito))
        
        let cant = carrito
        totalAccount(cant)

    }

    const cleanCart = (e)=>{
        e.preventDefault()
        setProductsSelected([])
        localStorage.removeItem("cart")
        let cant = 0
        totalAccount(cant)
    }



    const suma = (event) => {
        event.preventDefault()
        const name = event.target.name

        const increase = productsSelected.map((p) => {

            if (p.id == name) {
                return {
                    ...p,
                    amount: p.amount + 1
                }
            }
            return p
        })

        setProductsSelected(increase)
        cant = increase
        totalAccount(cant)

    }

    const resta = (event) => {
        event.preventDefault()
        const name = event.target.name
        const decrease = productsSelected.map((p) => {

            if (p.id == name && p.amount !== 1) {
                return {
                    ...p,
                    amount: p.amount - 1
                }
            }
            return p
        })

        setProductsSelected(decrease)
        cant = decrease
        totalAccount(cant)

    }


    const totalAccount = (cant) => {

        if (cant.length) {
            if (cant.length === 1) {
                
                setTotal(cant[0].price * cant[0].amount)
            }

            if (cant.length > 1) {
                let account = 0
                cant.forEach((p) => {
                    account += p.price * p.amount
                    setTotal(account.toFixed(2))
                });

            }

        }

    }






    return (
        <div>
            <h3>Productos en carrito de compras</h3>

            <div>
                {productsSelected.map((producto) => {
                    return (
                        <div key={producto.id}>
                            <p>{producto.name}</p>
                            <p>Precio unitario: {producto.price}</p>
                            <img src={producto.image} width="100px"></img>

                            <button onClick={(e) => deleteProduct(e, producto.id)}>Clean product</button>

                            <form>

                                <button onClick={resta} name={producto.id} >-</button>
                                {producto.amount}
                                <button onClick={suma} name={producto.id} >+</button>
                                <p>Precio por cantidad:{(producto.amount * producto.price).toFixed(2)}</p>
                            </form>

                            <hr />
                        </div>
                    )
                })}
            </div>
            {console.log(productsSelected)}
            <div>
                {productsSelected.length? <div>Total: {total}</div> : <div>Without products</div>}
            </div>

            <div>
                <button>BUY</button>
                <button onClick={(e)=>cleanCart(e)}>Clean cart</button>
            </div>
        </div>
    )
}

export default ProductShopCart