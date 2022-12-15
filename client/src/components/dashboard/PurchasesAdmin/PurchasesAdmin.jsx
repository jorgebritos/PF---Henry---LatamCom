import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteComment,
	dismissReport,
	getAllProducts,
	getAllPurchases,
	getAllReported,
} from '../../../redux/actions';
import { Link, NavLink } from 'react-router-dom';
import s from './PurchasesAdmin.module.css';

export default function PurchasesAdmin() {
	const dispatch = useDispatch();
	const allPurchases = useSelector((state) => state.purchasesAdmin);
	const allProducts = useSelector((state) => state.allProducts);
	const reportedComments = useSelector((state) => state.reportedComments);
	const outOfStock =
		allProducts.length > 0 ? allProducts.filter((p) => p.stock === 0) : [];

	useEffect(() => {
		dispatch(getAllPurchases());
		dispatch(getAllProducts());
		dispatch(getAllReported());
	}, [reportedComments, dispatch]);

	let totalIncome = () => {
		if (allPurchases.length > 0) {
			let total = 0;
			for (const p of allPurchases) {
				total += p.totalPrice;
			}

			return total.toFixed(2);
		} else {
			return 0;
		}
	};

	const dismissedReport = (id) => {
		dispatch(dismissReport(id));
	};

	return (
		<div className={s.conten}>
			<div>
				<h1 className={s.h1}>Total Income: ${totalIncome()} USD</h1>
			</div>

			{/* <hr className={s.hr} /> */}

			<div className={s.conte_row}>
				<div>
					{/* <h2 className={s.h2}>REPORTED COMMENTS</h2>
					<div className={s.cads}>
						{reportedComments.length > 0 ? (
							reportedComments.map((c) => {
								return (
									<div className={s.Card} key={c.id}>
										<p>User: {c.users[0].username}</p>
										<p>Comment: {c.comment}</p>
										<p>Inside Of: {c.products[0].name}</p>
										<h5>Actions:</h5>
										<button
											className={s.btn}
											onClick={(e) =>
												dispatch(deleteComment(c.users[0].id, c.products[0].id))
											}>
											Delete Comment
										</button>{' '}
										Or{' '}
										<button
											className={s.btn}
											onClick={(e) => dismissedReport(c.id)}>
											Dismiss
										</button>
										<br />
										<NavLink
											className={s.link}
											to={`/product/${c.products[0].id}`}>
											Click Here to Follow the Comment
										</NavLink>
									</div>
								);
							})
						) : (
							<h3>All Good for now!</h3>
						)}
					</div> */}
				</div>
				{/* <br />
				<hr className={s.hr} /> */}
				<br />
				<div>
					{/* <h2 className={s.h2}>ITEMS OUT OF STOCK</h2> */}

					{/* <div className={s.cads}>
						{outOfStock.length > 0 ? (
							outOfStock.map((p) => {
								return (
									<Link className={s.link} to={'/update'} key={p.id}>
										<div className={s.productCard}>
											<div className={s.cimg}>
												<img
													className={s.img}
													src={p.image}
													alt={`${p.name}_image`}
												/>
											</div>
											<div className={s.contenT}>
												<h4 className={s.name}>{p.name}</h4>
												<h3 className={s.text}>OUT OF STOCK</h3>
											</div>
										</div>
									</Link>
								);
							})
						) : outOfStock === 0 ? (
							<h3 className={s.h2}>Currently, All Items have Stock</h3>
						) : (
							<h3 className={s.h2}>Currently, your shop has no items</h3>
						)}
					</div> */}
				</div>
				<br />
				<hr className={s.hr} />
				<div>
					<h2 className={s.h2}>ALL USERS PURCHASES</h2>
					<div>
						{allPurchases.length > 0
							? allPurchases.map((i) => {
									return (
										<div key={i.id}>
											<h3>ITEMS:</h3>
											<p className={s.h3}>User: {i.users[0].username}</p>
											<div className={s.cads}>
												{i.products.map((p) => {
													return (
														<div className={s.productCard2} key={p.id}>
															<div className={s.cimg}>
																<img
																	className={s.img}
																	src={p.image}
																	alt={`${p.name}_image`}></img>
															</div>
															<div className={s.contenE}>
																<h4 className={s.name1}>{p.name}</h4>
																<h5 className={s.text}>
																	Unit Price: {p.price}
																</h5>
																<h6
																	className={
																		s.text
																	}>{`Amount of Items Purchased: ${p.amount} item(s)`}</h6>
															</div>
														</div>
													);
												})}
											</div>
											<h3 className={s.h3}>Total Price: ${i.totalPrice} USD</h3>
										</div>
									);
							  })
							: ''}
					</div>
				</div>
			</div>
		</div>
	);
}
