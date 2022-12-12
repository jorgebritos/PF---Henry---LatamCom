import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	getProductDetail,
	resetDetail,
	getAllProducts,
	getAllCategories,
	getAllUsers,
	putLocalstorage,
} from '../../../../redux/actions/index';

import CreateComment from '../CreateComment/CreateComment';
import Loading from '../../../loading/Loading';
import s from './Product.module.css';
//import { useAuth0 } from '@auth0/auth0-react';

const Product = () => {
	//const { isAuthenticated } = useAuth0();

	const addProduct = async (event) => {
		event.preventDefault();
		let cart = [];

		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		if (cart.find((p) => p.id === product.id)) {
			return 0;
		}
		cart.push({ ...product, amount: 1 });
		localStorage.setItem('cart', JSON.stringify(cart));
		dispatch(putLocalstorage());
	};

	// Hooks y estados ////////////////////////////////
	const { id } = useParams();
	const dispatch = useDispatch();
	const product = useSelector((state) => state.productDetail);
	//const user = useSelector((state) => state.user);
	///////////////////////////////////////////////////

	// Hook de ciclo de vida //////////////////////////
	useEffect(() => {
		dispatch(resetDetail());
		dispatch(getAllCategories());
		dispatch(getAllProducts());
		dispatch(getAllUsers());
		dispatch(getProductDetail(id));
		window.scrollTo(0,0)
	}, [id, dispatch]);
	//////////////////////////////////////////////////

	// Comprobacion renderizado //////////////////////

	if (!Object.keys(product).length) {
		return (
			<div className={s.loading}>
				<Loading />
			</div>
		);
	}
	// Esta es una comprobacion de renderizado el cual solo al verificar que el estado que tiene la informacion la posea
	// procese a renderizar los componentes. En vez de "Cargando..." puede ser una imagen o lo que ustedes prefieran
	// Borrar este mensaje una vez corregido
	//////////////////////////////////////////////////
	else {
		// Filtrado de comentarios ////////////////////

		///////////////////////////////////////////////

		return (
			<div className={s.body}>
				<div className={s.cont}>
					<div className={s.contImg}>
						<img
							src={product.image}
							alt='imagen del Producto'
							className={s.img}
						/>
					</div>
					<div className={s.contInfo}>
						<h1 className={s.name}>{product.name} </h1>
						<h2 className={s.price}>${product.price.toFixed(2)} USD</h2>
						{product.stock > 0 ? (
							<h3 className={s.h4}>Stock: {product.stock}</h3>
						) : (
							<h3 className={s.h4}>OUT OF STOCK</h3>
						)}
						<h4 className={s.h4}>Description:</h4>
						<p className={s.parafo}>{product.description}</p>
						<h4 className={s.h4}>Categories:</h4>
						{product.categories.map((e) => {
							return (
								<div key={e.name}>
									<p className={s.parafo}>{e.name}</p>
								</div>
							);
						})}
						{product.stock > 0 ? (
							<button className={s.btn} onClick={addProduct}>
								ADD TO CART
							</button>
						) : (
							<button className={s.btn} disabled={true}>
								OUT OF STOCK
							</button>
						)}
					</div>
				</div>
				<div className={s.contInfoComent}>
					<h2 className={s.h2}>Comments</h2>
					<CreateComment />
				</div>
			</div>
		);
	}
};

export default Product;
