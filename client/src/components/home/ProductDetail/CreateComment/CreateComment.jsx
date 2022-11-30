import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, updateRatingProduct } from '../../../../redux/actions';
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
	const comments = useSelector((state) => state.productComments);
	const productComments = comments.filter((c) => {
		return c.products[0].name === product.name;
	});
	let ratings = 0
	for (const c of productComments) {
		ratings += c.rating
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
			})
		);
		setComment({ ...comment, comment: '' });
	}

	const dispatch = useDispatch();
	// const user = useSelector((state) => state.user);
	useEffect(() => {
		if (ratings && id !== undefined) {
			console.log(ratings)
			console.log(product.id)
			dispatch(updateRatingProduct({rating: ratings, id:product.id}))
		}
	}, [dispatch, ratings, id])

	return (
		<div className={s.conten}>
			{ratings > 0 ? <label>Rating General del Producto: {ratings.toFixed(1)} ({productComments.length})</label> : ""}
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
			{productComments.length ? (
				<div>
					Comments:{' '}
					{productComments.map((c, index) => {
						return (
							<div key={index}>
								<p className={s.parafo}>{c.users.length? c.users[0].username : ""} - Rating: {c.rating}</p>
								<p className={s.parafo}>{c.comment}</p>
							</div>
						);
					})}
				</div>
			) : (
				<p className={s.parafo}>Without comentaries</p>
			)}
		</div>
	);
};

export default CreateComment;
