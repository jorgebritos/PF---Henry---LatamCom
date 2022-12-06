import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
	createComment,
	deleteComment,
	getAllComments,
	updateRatingProduct,
} from '../../../../redux/actions';
import s from './CreateComment.module.css';
import star from '../../../../asset/puntajes.png';

const CreateComment = (id) => {
	const { isAuthenticated } = useAuth0();
	const product = useSelector((state) => state.productDetail);
	const user = useSelector((state) => state.user);
	const [flag, setFlag] = useState(true)

	const [comment, setComment] = useState({
		comment: '',
		rating: 1,
	});

	function handleComment(e) {
		e.preventDefault();
		setComment({
			...comment,
			[e.target.name]: e.target.value,
		});
		return comment;
	}
	const comments = useSelector((state) => state.productComments);
	const productComments = comments.filter((c) => {
		return c.products.length ? c.products[0].name === product.name : "";
	});
	const userComment = productComments.filter((c) => {
		return c.users[0].username === user.username
	})
	let ratings = 0;
	for (const c of productComments) {
		ratings += c.rating;
	}
	ratings /= productComments.length;

	async function sendComment(e, idUser) {
		e.preventDefault();
		setFlag(!flag)
		let idProduct = product.id;
		dispatch(
			createComment({
				...comment,
				idUser,
				idProduct,
			}),
		);
		setComment({ ...comment, comment: '' });
	}

	async function deleteComments(e, idUser) {
		e.preventDefault()
		setFlag(!flag);
		let idProduct = product.id;
		dispatch(deleteComment(idUser, idProduct))
		dispatch(getAllComments(idProduct))
	}

	const dispatch = useDispatch();
	// const user = useSelector((state) => state.user);
	useEffect(() => {
		if (ratings && product.id !== undefined) {
			dispatch(updateRatingProduct({ rating: ratings, id: product.id }));
		}
	}, [dispatch, product.id, ratings]);

	useEffect(() => {
		if (product.id) dispatch(getAllComments(product.id));
	}, [dispatch, comments.length]);

	return (
		<div className={s.conten}>
			{ratings > 0 ? (
				<label>
					Rating General del Producto: {ratings.toFixed(1)} (
					{productComments.length})
				</label>
			) : (
				''
			)}
			<>
				{(isAuthenticated || user.username) ? (userComment.length === 0 && flag) ? (
					<div>
						<div className={s.rating}>
							<label>Rating:</label>
							<br />
							<select
								className={s.select}
								name='rating'
								onChange={(e) => handleComment(e)}>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
							</select>
							<br />
						</div>
						<div className={s.comment}>
							<textarea
								className={s.textarea}
								cols={50}
								name='comment'
								rows={10}
								placeholder={'Please, write a comment'}
								value={comment.comment}
								onChange={(e) => handleComment(e)}
							/>
							<button className={s.btn} onClick={(e) => sendComment(e, user.id)}>
								Send Comment
							</button>
						</div>
					</div>
				) : (
					<div>
						<p className={s.parafo}>You Already made a comment!</p>
						<button onClick={e => deleteComments(e, user.id)}>Delete Comment</button>
					</div>
				) : (
					<p className={s.parafo}>Must Log in to make a comment!</p>
				)}
			</>

			<div>
				{productComments.length ? (
					<div>
						<h3 className={s.h3}>Comments:</h3>
						{productComments.map((c, index) => {
							return (
								<div className={s.contenComments} key={index}>
									<p>{c.users.length ? c.users[0].username : ''}</p>
									<div className={s.divrow}>
										<h4 className={s.h3}>Rating:</h4>
										<div className={s.divrow}>
											<p className={s.par}>{c.rating}</p>
											<img
												src={star}
												alt=''
												height={'10px'}
												className={s.immg}
											/>
										</div>
									</div>

									<p className={s.parafo}>{c.comment}</p>
								</div>
							);
						})}
					</div>
				) : (
					<p className={s.parafo}>Without comentaries</p>
				)}
			</div>
		</div>
	);
};

export default CreateComment;
