import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyShoppingCart } from '../../redux/actions';
import s from './Buy.module.css';

const structuringProducts = (products) => {
	let ppProducts = products.map((p) => {
		let pp = {
			amount: {
				currency_code: 'USD',
				value: p.price * p.amount,
			},
			description: `Purchasing ${p.amount} item(s) of ${p.name}`,
			reference_id: p.id,
		};
		return pp;
	});
	return ppProducts;
};

const Buy = () => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);

	const seeProducts = () => {
		let cart = [];
		let price = [];

		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}

		if (localStorage.getItem('total')) {
			price = JSON.parse(localStorage.getItem('total'));
		}
		setTotal(price);
		setProducts(cart);
		return total;
	};
	const handleClick = (e, products) => {
		e.preventDefault();
		localStorage.setItem("idUser", user.id)
		dispatch(buyShoppingCart(structuringProducts(products)));
	};

	return (
		<div className={s.container}>
			<div>
				<h1 className={s.title}>Payment Method</h1>
			</div>
			<div className={s.content}>
				<div className={s.description}>
					<div>
						<h3 className={s.h3}>Total:</h3>
						{!total ? seeProducts() : <h2 className={s.h2}> ${Number(total).toFixed(2)} USD</h2>}
					</div>
				</div>
				<div className={s.metodoP}>
					<h3 className={s.h3}>Pay with</h3>
					<button
						onClick={(e) => handleClick(e, products)}
						className={s.paypalbtn}>
						<img
							src='https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg'
							alt='paypal'
							className={s.paypalimg}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};
export default Buy;
