import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom';

const ProductShopCart = () => {



    const [productsSelected, setProductsSelected] = useState([])
    const [total, setTotal] = useState(0)


    useEffect(() => {

        seeProducts()


    }, [])

    const seeProducts = () => {
        let cart = []

        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        setProductsSelected(cart)
        totalAccount()
    }

    const deleteProduct = (e, id) => {
        e.preventDefault()
        let carrito = productsSelected.filter((p) => p.id !== id)
        setProductsSelected(carrito)

        localStorage.setItem("cart", JSON.stringify(productsSelected))

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
        totalAccount()

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
        totalAccount()

    }


    const totalAccount = () => {

        if (productsSelected.length) {
            if (productsSelected.length === 1) {
                console.log(productsSelected)
                setTotal(productsSelected[0].price * productsSelected[0].amount)
            }

            if (productsSelected.length > 1) {
                let account = 0
                productsSelected.forEach((p) => {
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

            <div>
                <p>Total: {total} </p>
            </div>

            <div>
                <button>BUY</button>
                <button>Clean cart</button>
            </div>
        </div>
    )
}

export default ProductShopCart