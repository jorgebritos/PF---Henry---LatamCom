import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getAllComments, updateRatingProduct } from '../../../../redux/actions';
import s from './CreateComment.module.css';

const CreateComment = (id) => {
	const product = useSelector((state) => state.productDetail);

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
	let comments = useSelector((state) => state.productComments);
	let productComments = comments.filter((c) => {
		return c.products[0].name === product.name;
	});
	let ratings = 0;
	for (const c of productComments) {
		ratings += c.rating;
	}
	ratings /= productComments.length;
	async function sendComment(e) {
		e.preventDefault();
		let idProduct = product.id;
		if (!idProduct) return console.log('faltan datos');
		dispatch(
			createComment({
				...comment,
				idUser: 1,
				idProduct,
			}),
		);
		setComment({ ...comment, comment: '' });
		dispatch(getAllComments())
	}

	const dispatch = useDispatch();
	// const user = useSelector((state) => state.user);
	useEffect(() => {
		if (ratings && id !== undefined) {
			dispatch(updateRatingProduct({ rating: ratings, id: product.id }));
		}
	}, [dispatch, ratings, id]);

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
				<button className={s.btn} onClick={(e) => sendComment(e)}>
					Send Comment
				</button>
			</div>
			<br />
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
										<p className={s.par}>{c.rating}</p>
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
