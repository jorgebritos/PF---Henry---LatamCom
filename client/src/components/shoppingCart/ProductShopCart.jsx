import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import s from './ProductShopCart.module.css';

const ProductShopCart = () => {
	const [total, setTotal] = useState(0);
	const [productsSelected, setProductsSelected] = useState([]);
	const history = useHistory()
	let cant = 0;



	const seeProducts = () => {
		let cart = [];

		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}

		setProductsSelected(cart);
		let cant = cart;
		totalAccount(cant);
	};

	const deleteProduct = (e, id) => {
		e.preventDefault();
		let carrito = productsSelected.filter((p) => p.id !== id);
		setProductsSelected(carrito);

		localStorage.setItem('cart', JSON.stringify(carrito));

		let cant = carrito;
		totalAccount(cant);
	};

	const cleanCart = (e) => {
		e.preventDefault();
		setProductsSelected([]);
		localStorage.removeItem('cart');
		let cant = 0;
		totalAccount(cant);
	};

	const suma = (event) => {
		event.preventDefault();
		const name = event.target.name;

		const increase = productsSelected.map((p) => {
			if (p.id === Number(name)) {
				return {
					...p,
					amount: p.amount + 1,
				};
			}
			return p;
		});

		setProductsSelected(increase);
		cant = increase;
		totalAccount(cant);
	};

	const resta = (event) => {
		event.preventDefault();
		const name = event.target.name;
		const decrease = productsSelected.map((p) => {
			if (p.id === Number(name) && p.amount !== 1) {
				return {
					...p,
					amount: p.amount - 1,
				};
			}
			return p;
		});

		setProductsSelected(decrease);
		cant = decrease;
		totalAccount(cant);
	};

	const totalAccount = (cant) => {
		if (cant.length) {
			if (cant.length === 1) {
				setTotal(cant[0].price * cant[0].amount);
			}

			if (cant.length > 1) {
				let account = 0;
				cant.forEach((p) => {
					account += p.price * p.amount;
					setTotal(account.toFixed(2));
				});
			}
		}
	};

	const buyItems = (event) =>{
		event.preventDefault()
		history.push("/buyproducts")
		localStorage.setItem("total", JSON.stringify(total))

	}

	return (
		<div className={s.cont}>
			{!productsSelected.length ? seeProducts() : ""}
			<h1>SHOPPING CART</h1>
			<div className={s.contentP}>
				<div className={s.contG}>
					{productsSelected.map((producto) => {
						return (
							<div className={s.producCard} key={producto.id}>
								<div className={s.cimg}>
									<img className={s.img} src={producto.image} width='100px' alt='' />
								</div>
								<div className={s.cname}>
									<div>
										<h4 className={s.nameP}>{producto.name}</h4>
										<h2 className={s.precio}>${producto.price}</h2>
									</div>

									<button
										className={s.btn}
										onClick={(e) => deleteProduct(e, producto.id)}>
										REMOVE ITEM
									</button>
								</div>
								<div>
									<form className={s.form}>
										<button
											className={s.btnM}
											onClick={resta}
											name={producto.id}>
											-
										</button>

										<h4 className={s.name}>{producto.amount}</h4>

										<button
											className={s.btnM}
											onClick={suma}
											name={producto.id}>
											+
										</button>
									</form>
									<p className={s.price}>
										Quantity price: $
										{(producto.amount * producto.price).toFixed(2)}
									</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className={s.contenedor}>
					<div className={s.contT}>
						<div className={s.contpago}>
							<div>
								{productsSelected.length ? (
									<div>
										<h2 className={s.precio}>Total: {total}</h2>
									</div>
								) : (
									<div>
										<h3 className={s.precio}>Without products</h3>{' '}
									</div>
								)}
							</div>

							<div className={s.contP}>
								<button className={s.btn} onClick={(e) => cleanCart(e)}>
									CLEAN CART
								</button>
								<br />
								<button className={s.btnB} onClick={buyItems} >BUY</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductShopCart;
