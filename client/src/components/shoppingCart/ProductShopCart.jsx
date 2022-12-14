import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './ProductShopCart.module.css';
import { putLocalstorage } from '../../redux/actions';

const ProductShopCart = () => {
	const [total, setTotal] = useState(0.00);
	const [productsSelected, setProductsSelected] = useState([]);
	const history = useHistory();
	const dispatch = useDispatch();
	let cant = 0;

	// Traer productos del localStorage ///
	const seeProducts = useCallback(() => {
		let cart = [];
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}

		setProductsSelected(cart);
		let cant = cart;
		totalAccount(cant);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		seeProducts();
	}, [seeProducts]);
	///////////////////////////////////////

	// Eliminar 1 producto del carrito ////
	const deleteProduct = (e, id) => {
		e.preventDefault();
		let carrito = productsSelected.filter((p) => p.id !== id);
		setProductsSelected(carrito);

		localStorage.setItem('cart', JSON.stringify(carrito));

		let cant = carrito;
		totalAccount(cant);
		dispatch(putLocalstorage());
	};
	///////////////////////////////////////

	// Eliminar todos los productos del carrito
	const cleanCart = (e) => {
		e.preventDefault();
		setProductsSelected([]);
		localStorage.removeItem('cart');
		let cant = 0;
		totalAccount(cant);
		dispatch(putLocalstorage());
	};
	///////////////////////////////////////

	// Aumentar o disminuir cantidades
	const suma = (event) => {
		event.preventDefault();
		const name = event.target.name;
		const increase = productsSelected.map((p) => {
			if (p.id === Number(name) && (p.amount + 1) <= p.stock) {
				return {
					...p,
					amount: (p.amount + 1),
				};
			}
			return p;
		});
		setProductsSelected(increase);
		totalAccount(increase)
		localStorage.setItem("cart", JSON.stringify(increase))
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
		localStorage.setItem("cart", JSON.stringify(decrease))
	};
	////////////////////////////////////////

	// Cuenta total: agregado de condicionales para cambiar los valores del localStorage
	const totalAccount = (cant) => {
		if (cant.length) {
			if (cant.length === 1) {
				setTotal(cant[0].price * cant[0].amount);
				localStorage.setItem(
					'total',
					JSON.stringify(cant[0].price * cant[0].amount),
				);
				console.log(cant[0].price * cant[0].amount);
			}

			if (cant.length > 1) {
				let account = 0;
				cant.forEach((p) => {
					account += p.price * p.amount;
					setTotal(account.toFixed(2));
					localStorage.setItem('total', JSON.stringify(account));
				});
			}
		}
		if (cant === 0 || cant.length === 0) {
			setTotal(0);
			localStorage.setItem('total', JSON.stringify(0));
		}
		console.log(total);
	};
	///////////////////////////////////////

	// Comprar items: agregado localStorage
	const buyItems = (event) => {
		event.preventDefault();
		localStorage.setItem('total', JSON.stringify(parseFloat(total)));
		history.push('/buyproducts');
	};
	///////////////////////////////////////

	// Buttom /////////////////////////////
	const sendButton = document.getElementById('sendButtom');

	if (sendButton) {
		productsSelected.length
			? (sendButton.disabled = false)
			: (sendButton.disabled = true);
	}
	///////////////////////////////////////

	return (
		<div className={s.cont}>
			<h1>SHOPPING CART</h1>
			<div className={s.contentP}>
				<div className={s.contG}>
					{productsSelected.map((producto) => {
						return (
							<div className={s.producCard} key={producto.id}>
								<div className={s.cimg}>
									<img
										className={s.img}
										src={producto.image}
										width='100px'
										alt=''
									/>
								</div>
								<div className={s.cname}>
									<div>
										<h4 className={s.nameP}>{producto.name}</h4>
										<h2 className={s.precio}>${producto.price.toFixed(2)}</h2>
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
								{console.log(total)}
								{productsSelected.length ? (
									<div>
										<h2 className={s.precio}>Total: {Number(total).toFixed(2)}</h2>
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
								<button className={s.btnB} onClick={buyItems} id="sendButtom">
									BUY
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductShopCart;
